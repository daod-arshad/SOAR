#! /usr/bin/env python3
import sys
import re
from datetime import datetime

if __name__ == "__main__":

    if len(sys.argv) != 3:
        print('Usage:', sys.argv[0], '<process PID>', file=sys.stderr)
        exit(1)

    pid = sys.argv[1]  ## process_id
    process_name = sys.argv[2]    ## file_name

    now = datetime.now()

    dt_string = now.strftime("%d%m%Y_%H%M%S")  ## current date and time

    # maps contains the mapping of memory of a specific project
    map_file = f"/proc/{pid}/maps"
    mem_file = f"/proc/{pid}/mem"

    # output file
    out_file = f'{process_name}_{dt_string}.dump'

    # iterate over regions
    with open(map_file, 'r') as map_f, open(mem_file, 'rb', 0) as mem_f, open(out_file, 'wb') as out_f:
        for line in map_f.readlines():  # for each mapped region
            m = re.match(r'([0-9A-Fa-f]+)-([0-9A-Fa-f]+) ([-r])', line)
            if m.group(3) == 'r':  # readable region
                start = int(m.group(1), 16)
                end = int(m.group(2), 16)
                mem_f.seek(start)  # seek to region start
                print(hex(start), '-', hex(end))
                try:
                    chunk = mem_f.read(end - start)  # read region contents
                    out_f.write(chunk)  # dump contents to standard output
                except OSError:
                    print(hex(start), '-', hex(end), '[error,skipped]', file=sys.stderr)
                    continue
    print(f'Memory dump saved to {out_file}')
