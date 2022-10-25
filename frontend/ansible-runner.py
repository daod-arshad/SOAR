import json
import ansible_runner
import sys

playbook_logs = []
for i in range(1, len(sys.argv)):
    js_object = sys.argv[i]
    py_dict = json.loads(js_object)
    if py_dict['data']['vault_pass'] == None or len(py_dict['data']['vault_pass']) == 0:
        r = ansible_runner.run(
        playbook=f"{py_dict['data']['path']}{py_dict['name']}",
        extravars=py_dict["data"],
        cmdline=f"--module-path {py_dict['data']['module_path']}")
    else:
        r = ansible_runner.run(
            playbook=f"{py_dict['data']['path']}{py_dict['name']}",
            extravars=py_dict["data"],
            cmdline=f"--module-path {py_dict['data']['module_path']} --vault-password-file {py_dict['data']['vault_pass']}",)
    print("{}: {}".format(r.status, r.rc))
    # successful: 0
    for each_host_event in r.events:
        print(each_host_event["event"])
    playbook_status = {"playbook_name":py_dict['data']['display_name'],"data":r.stats}
    playbook_logs.append(playbook_status)
    print("Final status:")
    print(r.stats)

# print('playbook logs',playbook_logs)
requests.post('http://localhost:3000/playbook_logs/',json=playbook_logs)