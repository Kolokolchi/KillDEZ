"""Read-only report of differences from the accepted site foundation.

Exit codes: 0 = unchanged, 1 = differences to review, 2 = invalid/missing baseline.
Differences may be intentional; never restore files automatically from this report.
"""
from pathlib import Path
import hashlib
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
BASELINE = ROOT / 'docs/baseline/2026-09-29/manifest.json'


def collect(root, patterns):
    return {
        path.relative_to(root).as_posix(): hashlib.sha256(path.read_bytes()).hexdigest()
        for pattern in patterns
        for path in root.glob(pattern)
        if path.is_file() and '__pycache__' not in path.parts
    }


def compare(expected, current):
    return {
        'MISSING': sorted(expected.keys() - current.keys()),
        'CHANGED': sorted(k for k in expected.keys() & current.keys() if expected[k] != current[k]),
        'ADDED': sorted(current.keys() - expected.keys()),
    }


def main():
    try:
        baseline = json.loads(BASELINE.read_text(encoding='utf-8'))
        patterns = baseline['patterns']
        expected = baseline['sha256']
        if not isinstance(patterns, list) or not patterns or not isinstance(expected, dict) or not expected:
            raise ValueError('Empty or invalid baseline')
        changes = compare(expected, collect(ROOT, patterns))
    except (OSError, ValueError, KeyError, TypeError) as error:
        print(f'Cannot check baseline: {error}', file=sys.stderr)
        return 2
    print(f'Foundation: {baseline["date"]}; {len(expected)} recorded files.')
    for kind, paths in changes.items():
        print(f'{kind}: {len(paths)}')
        for path in paths:
            print(f'  {path}')
    if any(changes.values()):
        print('Review differences against the task and the pre-task working tree. Do not auto-revert or overwrite the baseline.')
        return 1
    print('Site foundation is byte-for-byte unchanged. This is not a browser/behavior test.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
