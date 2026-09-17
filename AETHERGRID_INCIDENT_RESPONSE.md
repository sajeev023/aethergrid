# 🚨 AETHERGRID INCIDENT RESPONSE PLAYBOOK
**Document Version**: 2.0.0 (Zero-Trust Operations)  
**Target Audience**: Security Operations, Infrastructure Engineers, On-Call Personnel

---

## 1. Incident Classification Framework

| Severity Level | Definition | Examples | SLA Response |
| :--- | :--- | :--- | :--- |
| **SEV-1 (CRITICAL)** | Active breach of platform secrets, systemic data corruption, or verified cross-tenant IDOR exploit. | Platform master key leak, multi-node storage failure causing unrecoverable data loss. | **Immediate (15 min)** |
| **SEV-2 (HIGH)** | Individual Giver node compromise, active chunk tampering detected, brute force against admin accounts. | Provider reports compromised host, GCM authentication tag failure detected during download. | **30 Minutes** |
| **SEV-3 (MEDIUM)** | Storage node heartbeat degradation, high failure rate on payment webhooks, rate limit trigger anomalies. | Provider node missing heartbeats for >90s, payment gateway webhook signature mismatch. | **2 Hours** |
| **SEV-4 (LOW)** | Minor telemetry anomalies, isolated client download timeout, non-exploitable error traces. | Provider node reporting intermittent latency spikes. | **1 Business Day** |

---

## 2. Standard Operating Procedures (SOPs)

### SOP-1: Compromised Giver Node Remediation
**Trigger**: Provider alerts security, suspicious outbound traffic from node IP, or unauthorized physical disk access suspected.
1. **Immediate Revocation**:
   * Execute node revocation API or CLI:
     ```bash
     curl -X POST https://aethergrid.io/api/nodes/<NODE_ID>/revoke \
       -H "Authorization: Bearer <ADMIN_OR_OWNER_TOKEN>"
     ```
   * The node's `node_token_hash` is instantly overwritten and `status` set to `REVOKED`.
2. **Allocation Quarantine**:
   * Verify node is excluded from `selectReplicaNodes` (orchestrator filters out any node not having `status = 'ONLINE'`).
3. **Replication Health Audit**:
   * Identify all chunks where the revoked node was primary:
     ```sql
     SELECT file_id, chunk_index, chunk_hash, replica_node_id 
     FROM storage_chunks 
     WHERE primary_node_id = '<NODE_ID>';
     ```
4. **Data Healing & Re-replication**:
   * Run the repair orchestrator to promote existing replicas and allocate new secondary chunks on another online node.
5. **Post-Mortem**: Document incident in `audit_logs` and review Giver onboarding logs.

---

### SOP-2: Chunk Tampering or Bit-Flip Incident
**Trigger**: Orchestrator logs `DataTamperedError: Chunk authentication tag mismatch. Data has been tampered with or corrupted.`
1. **Automated Containment**:
   * The orchestrator automatically catches the tag mismatch during `decipher.final()`.
   * The tampered node is bypassed and retrieval immediately fails over to the healthy replica node.
   * File SHA-256 is verified before delivery to the customer.
2. **Node Health Penalty**:
   * Identify which node served the corrupted chunk.
   * Inspect recent heartbeats and disk SMART metrics.
   * If corruption is repeated, administratively pause or revoke the node.
3. **Chunk Replacement**:
   * Copy the verified replica chunk over to repair the degraded copy.

---

### SOP-3: Suspected Taker Account Compromise
**Trigger**: Customer reports unauthorized file deletion, or IP geo-anomaly detected.
1. **Session Termination**:
   * Terminate all active sessions for the user:
     ```sql
     DELETE FROM sessions WHERE user_id = '<USER_ID>';
     ```
2. **Password Invalidation**:
   * Trigger forced password reset with high-entropy reset token.
3. **File Recovery**:
   * Check `files` table for soft-deleted items (`is_trashed = 1`) and restore required files before permanent purging.

---

### SOP-4: Emergency Platform Secret Rotation
**Trigger**: Environment variable leak or server compromise.
1. Generate new 256-bit cryptographically secure secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
2. Deploy dual-key configuration (New Key for all new uploads; Old Key maintained in decryption fallback ring).
3. Execute offline chunk re-encryption migration utility.
4. Decommission old secret key once all chunks are re-keyed.
