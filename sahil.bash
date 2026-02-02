[root@aad9763ebe29:/sahil03# touch hello.txt
[root@aad9763ebe29:/sahil03# touch world.txt
[root@aad9763ebe29:/sahil03# ls
hello.txt  world.txt
[root@aad9763ebe29:/sahil03# echo "HELLO SAHIL03" > hello.txt
[root@aad9763ebe29:/sahil03# echo "HELLO POTTER" > world.txt
[root@aad9763ebe29:/sahil03# head hello.txt
HELLO SAHIL03
[root@aad9763ebe29:/sahil03# tail world.txt
HELLO POTTER
[root@aad9763ebe29:/sahil03# pwd
/sahil03
[root@aad9763ebe29:/sahil03# mkdir sample
[root@aad9763ebe29:/sahil03# cd sample
[root@aad9763ebe29:/sahil03/sample# cd ..
[root@aad9763ebe29:/sahil03# rmdir sample
[root@aad9763ebe29:/sahil03# cat hello.txt
HELLO SAHIL03
[root@aad9763ebe29:/sahil03# which grep
/usr/bin/grep
[root@aad9763ebe29:/sahil03# whereis ls
ls: /usr/bin/ls
[root@aad9763ebe29:/sahil03# locate google
bash: locate: command not found
[root@aad9763ebe29:/sahil03# find . -name \*txt
./world.txt
./hello.txt
[root@aad9763ebe29:/sahil03# ps
  PID TTY          TIME CMD
    1 pts/0    00:00:00 bash
   28 pts/0    00:00:00 ps
[root@aad9763ebe29:/sahil03# w
 09:25:48 up  6:33,  0 user,  load average: 2.67, 2.46, 2.45
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
[root@aad9763ebe29:/sahil03# id
uid=0(root) gid=0(root) groups=0(root)
[root@aad9763ebe29:/sahil03# df
Filesystem     1K-blocks      Used Available Use% Mounted on
overlay        234492896  14254916 208253548   7% /
tmpfs              65536         0     65536   0% /dev
shm                65536         0     65536   0% /dev/shm
/dev/vda1      234492896  14254916 208253548   7% /etc/hosts
tmpfs            4012424         0   4012424   0% /proc/scsi
tmpfs            4012424         0   4012424   0% /sys/firmware
[root@aad9763ebe29:/sahil03# du
12      .







