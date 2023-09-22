AVENUES OF IMPROVEMENT FOR SOAR

1.	The project only supports linking single playbooks i.e. one playbook can only be connected to another playbooks. Other Soar solutions support connection a single playbook to multiple playbooks.
2.	Only 4 playbooks work, the other playbooks are integrated but some components for their execution are missing.
3.	The project has only been tested by running the frontend and the backend on the same machine. In order to provide horizontal scalability, frontend and backed should be deployed on separate machine which the project supports but this feature has not been tested.
4.	The project can be made to query wazuh data stored in wazuh indexer which does not require internet as opposed to mongodb which is currently in use.
5.	Proper work on queuing is suggested.
6.	The project is not utilizing encryption via certificates.
7.	There is some error in JWT which does not take to the login page when logged in, instead one has to manually type the URL, the first time. 
