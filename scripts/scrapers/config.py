from pathlib import Path

# Paths
BASE_DIR = Path(__file__).parent.parent.parent
DATA_DIR = BASE_DIR / "data" / "brands"
OUTPUT_FILE = BASE_DIR / "data" / "scraped_products.json"

# Browser Settings
VIEWPORT = {"width": 1920, "height": 1080}
DEFAULT_TIMEOUT = 60000
HEADLESS = True

# Scraper Settings
DEFAULT_LIMIT = 50
RETRY_COUNT = 3
RETRY_DELAY = 5  # seconds
REQUEST_DELAY_MIN = 2
REQUEST_DELAY_MAX = 5

# Anti-Detection
USE_PROXY = False  # Set to True if proxies are available
PROXY_LIST = []  # Add proxy URLs here if available

# Currency Conversion (Approximate)
KRW_TO_USD_RATE = 1350.0

# Brand URLs
BRAND_URLS = {
    "ZARA": {
        "women-tops": "https://www.zara.com/kr/ko/woman-shirts-l1217.html",
        "women-dresses": "https://www.zara.com/kr/ko/woman-dresses-l1066.html",
        "women-outerwear": "https://www.zara.com/kr/ko/woman-outerwear-l1184.html",
        "women-bottoms": "https://www.zara.com/kr/ko/woman-trousers-l1335.html",
    },
    "HM": {
        "women-tops": "https://www2.hm.com/ko_kr/women/shop-by-product/tops.html",
        "women-dresses": "https://www2.hm.com/ko_kr/women/shop-by-product/dresses.html",
        "women-outerwear": "https://www2.hm.com/ko_kr/women/shop-by-product/jackets-coats.html",
        "women-bottoms": "https://www2.hm.com/ko_kr/women/shop-by-product/trousers.html",
    },
    "UNIQLO": {
        "women-tops": "https://www.uniqlo.com/kr/ko/women/tops",
        "women-dresses": "https://www.uniqlo.com/kr/ko/women/dresses-jumpsuits",
        "women-outerwear": "https://www.uniqlo.com/kr/ko/women/outerwear",
        "women-bottoms": "https://www.uniqlo.com/kr/ko/women/bottoms",
    },
    "GAP": {
        "women-tops": "https://www.gap.com/browse/category.do?cid=65179",
        "women-dresses": "https://www.gap.com/browse/category.do?cid=13658",
        "women-outerwear": "https://www.gap.com/browse/category.do?cid=5736",
        "women-bottoms": "https://www.gap.com/browse/category.do?cid=5664",
    },
    "MASSIMO_DUTTI": {
        "women-tops": "https://www.massimodutti.com/kr/women/collection/shirts-n1424",
        "women-dresses": "https://www.massimodutti.com/kr/women/collection/dresses-n1423",
        "women-outerwear": "https://www.massimodutti.com/kr/women/collection/jackets-n1422",
        "women-bottoms": "https://www.massimodutti.com/kr/women/collection/trousers-n1425",
    },
    "COS": {
        "women-tops": "https://www.cos.com/en_kr/women/tops.html",
        "women-dresses": "https://www.cos.com/en_kr/women/dresses.html",
        "women-outerwear": "https://www.cos.com/en_kr/women/coats-and-jackets.html",
        "women-bottoms": "https://www.cos.com/en_kr/women/trousers.html",
    },
    "TOPTEN": {
        "women-tops": "https://topten.topten10mall.com/kr/front/category/category_list.do?ctgryNo=1000000003",
        "women-dresses": "https://topten.topten10mall.com/kr/front/category/category_list.do?ctgryNo=1000000007",
        "women-outerwear": "https://topten.topten10mall.com/kr/front/category/category_list.do?ctgryNo=1000000006",
        "women-bottoms": "https://topten.topten10mall.com/kr/front/category/category_list.do?ctgryNo=1000000005",
    },
    "GUCCI": {
        "women-ready-to-wear": "https://www.gucci.com/kr/ko/ca/women/ready-to-wear-c-women-readytowear",
        "women-dresses": "https://www.gucci.com/kr/ko/ca/women/ready-to-wear/dresses-c-women-dresses",
        "women-outerwear": "https://www.gucci.com/kr/ko/ca/women/ready-to-wear/coats-jackets-c-women-coats-jackets",
        "women-bags": "https://www.gucci.com/kr/ko/ca/women/handbags-c-women-handbags",
    },
    "LOUIS_VUITTON": {
        "women-bags": "https://kr.louisvuitton.com/kor-kr/women/handbags/all-handbags/_/N-tfr7qdp",
        "women-small-leather-goods": "https://kr.louisvuitton.com/kor-kr/women/wallets-and-small-leather-goods/all-wallets-and-small-leather-goods/_/N-t191562z",
    },
    "DIOR": {
        "women-bags": "https://www.dior.com/ko_kr/fashion/womens-fashion/bags/all-bags",
        "women-jewelry": "https://www.dior.com/ko_kr/fashion/womens-fashion/jewelry/all-jewelry",
    }
}
