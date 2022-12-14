all:
  vars:
    ansible_ssh_user: ubuntu
  children:
    masters:
        hosts:
          ${ master_public_ip }:
    workers:
        hosts:
%{ for index, node_ip in nodes_public_ips ~}
          ${ node_ip }:
%{ endfor ~}