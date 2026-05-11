#!/usr/bin/env python3
"""Sync shared HTML partials into page files.

Partials live in _includes/ and use {{ VAR }} placeholders.
Page files contain marker pairs:
    <!-- partial:NAME -->
    ...existing content replaced on sync...
    <!-- /partial:NAME -->

Variables are auto-derived from each page's path relative to the project root:
    BASE          ""  for root files, "../" for services/*
    SERVICES      "services/" for root files, "" for services/*
    HASH_PREFIX   ""  for root files, "../index.html" for services/*

Usage:
    python build.py            # sync all pages (default)
    python build.py --check    # exit 1 if any page is out of sync (for CI)
"""

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
INCLUDES_DIR = ROOT / "_includes"

PAGES = [
    ROOT / "index.html",
    ROOT / "services" / "qa-retainer.html",
    ROOT / "services" / "qa-scorecard.html",
    ROOT / "services" / "web-agency.html",
]

MARKER_RE = re.compile(
    r"([ \t]*<!-- partial:(\w[\w-]*) -->)\n"
    r"(.*?)"
    r"([ \t]*<!-- /partial:\2 -->)",
    re.DOTALL,
)


def compute_vars(page_path: Path) -> dict[str, str]:
    rel = page_path.resolve().relative_to(ROOT)
    depth = len(rel.parts) - 1  # 0 for root, 1 for services/*
    if depth == 0:
        return {"BASE": "", "SERVICES": "services/", "HASH_PREFIX": ""}
    prefix = "../" * depth
    return {"BASE": prefix, "SERVICES": "", "HASH_PREFIX": f"{prefix}index.html"}


def render_partial(name: str, variables: dict[str, str]) -> str:
    partial_path = INCLUDES_DIR / f"{name}.html"
    if not partial_path.exists():
        sys.exit(f"ERROR: partial not found: {partial_path}")
    content = partial_path.read_text(encoding="utf-8")
    for key, value in variables.items():
        content = content.replace("{{ " + key + " }}", value)
    return content


def process_page(page: Path, check_only: bool) -> bool:
    if not page.exists():
        print(f"  SKIP {page.relative_to(ROOT)} (not found)")
        return True

    original = page.read_text(encoding="utf-8")
    variables = compute_vars(page)

    def replacer(m: re.Match) -> str:
        indent = m.group(1).split("<!--")[0]
        name = m.group(2)
        open_tag = m.group(1)
        close_tag = m.group(4)
        rendered = render_partial(name, variables)
        indented = "\n".join(
            (indent + line) if line.strip() else line
            for line in rendered.splitlines()
        )
        return f"{open_tag}\n{indented}\n{close_tag}"

    result = MARKER_RE.sub(replacer, original)

    if result == original:
        return True

    rel = page.relative_to(ROOT)
    if check_only:
        print(f"  OUT OF SYNC: {rel}")
        return False

    page.write_text(result, encoding="utf-8")
    print(f"  UPDATED: {rel}")
    return True


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check",
        action="store_true",
        help="Verify pages are in sync without writing (exit 1 if not)",
    )
    args = parser.parse_args()

    print("build.py — partial sync" + (" [CHECK MODE]" if args.check else ""))

    all_ok = True
    for page in PAGES:
        ok = process_page(page, check_only=args.check)
        if not ok:
            all_ok = False

    if not all_ok:
        print("\nFAILED: Some pages are out of sync. Run 'python build.py' to fix.")
        sys.exit(1)

    print("\nDone." + (" All pages in sync." if args.check else ""))


if __name__ == "__main__":
    main()
