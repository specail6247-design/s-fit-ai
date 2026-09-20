import re

def format_price(price):
    return f"${price:,.0f}"

print(format_price(12500))
