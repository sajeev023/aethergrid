#!/bin/bash
routes=(
  "/" "/about" "/academics" "/faculty" "/faculty/teaching" "/faculty/principals" "/faculty/retired"
  "/campus" "/campus/silver-jubilee" "/campus/golden-jubilee" "/campus/campus-life"
  "/admissions" "/alumni" "/contact" "/parent-login"
  "/legal/anti-ragging" "/legal/privacy" "/legal/terms" "/legal/disclosures" "/legal/refund-cancellation"
  "/gallery" "/lfjc" "/admin" "/admin/dashboard" "/admin/login"
)
for r in "${routes[@]}"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3001$r")
  echo "$code $r"
done
