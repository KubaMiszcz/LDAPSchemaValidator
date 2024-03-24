export const EXAMPLE_LDIF_SCHEMA =
  '# LDIF Export for dc=ldap,dc=local\n# Server: TurnKey OpenLDAP (127.0.0.1)\n# Search Scope: sub\n# Search Filter: (objectClass=*)\n# Total Entries: 53\n#\n# Generated by phpLDAPadmin (http://phpldapadmin.sourceforge.net) on March 24, 2024 10:29 am\n# Version: 1.2.6.3\n\nversion: 1\n\n# Entry 1: dc=ldap,dc=local\ndn: dc=ldap,dc=local\ndc: ldap\no: ldap.local\nobjectclass: top\nobjectclass: dcObject\nobjectclass: organization\n\n# Entry 2: cn=ServiceAccounts,dc=ldap,dc=local\ndn: cn=ServiceAccounts,dc=ldap,dc=local\ncn: ServiceAccounts\ngidnumber: 2001\nmemberuid: openfireserviceaccountreader\nmemberuid: dummyuser\nmemberuid: takserviceaccountreader\nobjectclass: posixGroup\nobjectclass: top\n\n# Entry 3: cn=312klp-TAKReader,cn=ServiceAccounts,dc=ldap,dc=local\ndn: cn=312klp-TAKReader,cn=ServiceAccounts,dc=ldap,dc=local\ncn:  312klp-TAKReader\ngidnumber: 2001\nhomedirectory: /home/users/312klp-takreader\nobjectclass: inetOrgPerson\nobjectclass: posixAccount\nobjectclass: top\nsn: 312klp-TAKReader\nuid: 312klp-takreader\nuidnumber: 2006\nuserpassword: {MD5}6AQpkF6iuJugzSIGiWtciA==\n\n# Entry 4: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\ndn: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\ncn: dummyUser\ngidnumber: 2001\nhomedirectory: /home/users/dummyuser\nobjectclass: inetOrgPerson\nobjectclass: posixAccount\nobjectclass: top\nsn: dummyUser\nuid: dummyuser\nuidnumber: 2000\n\n# Entry 5: cn=OpenFireReader,cn=ServiceAccounts,dc=ldap,dc=local\ndn: cn=OpenFireReader,cn=ServiceAccounts,dc=ldap,dc=local\ncn:  OpenFireReader\ngidnumber: 2001\nhomedirectory: /home/users/openfirereader\nobjectclass: inetOrgPerson\nobjectclass: posixAccount\nobjectclass: top\nsn: OpenFireReader\nuid: openfirereader\nuidnumber: 2004\nuserpassword: {MD5}9cnUHyVc6Z5xL9uEDpClIA==\n\n# Entry 6: ou=312klp-ATAK,dc=ldap,dc=local\ndn: ou=312klp-ATAK,dc=ldap,dc=local\nobjectclass: organizationalUnit\nobjectclass: top\nou: 312klp-ATAK\n\n# Entry 7: cn=users,ou=312klp-ATAK,dc=ldap,dc=local\ndn: cn=users,ou=312klp-ATAK,dc=ldap,dc=local\ncn: users\ngidnumber: 312\nmemberuid: 3p1s-GRZEKOBI\nmemberuid: Grazyna\nmemberuid: Maniek\nobjectclass: posixGroup\nobjectclass: top\n\n# Entry 8: cn=3p1s-GRZEKOBI,cn=users,ou=312klp-ATAK,dc=ldap,dc=local\ndn: cn=3p1s-GRZEKOBI,cn=users,ou=312klp-ATAK,dc=ldap,dc=local\ncn: 3p1s-GRZEKOBI\ngidnumber: 312\nhomedirectory: /home/users/3p1s-GRZEKOBI\nobjectclass: inetOrgPerson\nobjectclass: posixAccount\nobjectclass: top\nsn: 3p1s-GRZEKOBI\nuid: 3p1s-GRZEKOBI\nuidnumber: 312311\n\n# Entry 9: cn=Grazyna,cn=users,ou=312klp-ATAK,dc=ldap,dc=local\ndn: cn=Grazyna,cn=users,ou=312klp-ATAK,dc=ldap,dc=local\ncn: Grazyna\ngidnumber: 312\nhomedirectory: /home/users/Grazyna\nobjectclass: inetOrgPerson\nobjectclass: posixAccount\nobjectclass: top\nsn: Grazyna\nuid: Grazyna\nuidnumber: 3333\n\n# Entry 10: cn=Maniek,cn=users,ou=312klp-ATAK,dc=ldap,dc=local\ndn: cn=Maniek,cn=users,ou=312klp-ATAK,dc=ldap,dc=local\ncn: Maniek\ngidnumber: 312\nhomedirectory: /home/users/Maniek\nobjectclass: inetOrgPerson\nobjectclass: posixAccount\nobjectclass: top\nsn: Maniek\nuid: Maniek\nuidnumber: 2222\n\n# Entry 11: ou=OverlaysContainer,ou=312klp-ATAK,dc=ldap,dc=local\ndn: ou=OverlaysContainer,ou=312klp-ATAK,dc=ldap,dc=local\nobjectclass: organizationalUnit\nobjectclass: top\nou: OverlaysContainer\n\n# Entry 12: cn=0312-AllUsers,ou=OverlaysContainer,ou=312klp-ATAK,dc=ldap,...\ndn: cn=0312-AllUsers,ou=OverlaysContainer,ou=312klp-ATAK,dc=ldap,dc=local\ncn: 0312-AllUsers\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 13: cn=0312-AllUsers_READ,cn=0312-AllUsers,ou=OverlaysContainer,o...\ndn: cn=0312-AllUsers_READ,cn=0312-AllUsers,ou=OverlaysContainer,ou=312klp-AT\n AK,dc=ldap,dc=local\ncn: 0312-AllUsers_READ\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 14: cn=0312-AllUsers_WRITE,cn=0312-AllUsers,ou=OverlaysContainer,...\ndn: cn=0312-AllUsers_WRITE,cn=0312-AllUsers,ou=OverlaysContainer,ou=312klp-A\n TAK,dc=ldap,dc=local\ncn: 0312-AllUsers_WRITE\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nmember: cn=3p1s-GRZEKOBI,cn=users,ou=312klp-ATAK,dc=ldap,dc=local\nmember: cn=Grazyna,cn=users,ou=312klp-ATAK,dc=ldap,dc=local\nmember: cn=Maniek,cn=users,ou=312klp-ATAK,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 15: cn=0312-HQ-CompanyCommand,ou=OverlaysContainer,ou=312klp-ATAK...\ndn: cn=0312-HQ-CompanyCommand,ou=OverlaysContainer,ou=312klp-ATAK,dc=ldap,dc\n =local\ncn: 0312-HQ-CompanyCommand\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 16: cn=312-HQ-CompanyCommand_READ,cn=0312-HQ-CompanyCommand,ou=Ov...\ndn: cn=312-HQ-CompanyCommand_READ,cn=0312-HQ-CompanyCommand,ou=OverlaysConta\n iner,ou=312klp-ATAK,dc=ldap,dc=local\ncn: 312-HQ-CompanyCommand_READ\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 17: cn=312-HQ-CompanyCommand_WRITE,cn=0312-HQ-CompanyCommand,ou=O...\ndn: cn=312-HQ-CompanyCommand_WRITE,cn=0312-HQ-CompanyCommand,ou=OverlaysCont\n ainer,ou=312klp-ATAK,dc=ldap,dc=local\ncn: 312-HQ-CompanyCommand_WRITE\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 18: cn=1-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,dc=ld...\ndn: cn=1-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,dc=ldap,dc=local\ncn: 1-PlatoonCommand\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 19: cn=1p1s-Section,cn=1-PlatoonCommand,ou=OverlaysContainer,ou=3...\ndn: cn=1p1s-Section,cn=1-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,\n dc=ldap,dc=local\ncn: 1p1s-Section\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 20: cn=1p2s-Section,cn=1-PlatoonCommand,ou=OverlaysContainer,ou=3...\ndn: cn=1p2s-Section,cn=1-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,\n dc=ldap,dc=local\ncn: 1p2s-Section\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 21: cn=1p3s-Section,cn=1-PlatoonCommand,ou=OverlaysContainer,ou=3...\ndn: cn=1p3s-Section,cn=1-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,\n dc=ldap,dc=local\ncn: 1p3s-Section\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 22: cn=2-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,dc=ld...\ndn: cn=2-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,dc=ldap,dc=local\ncn: 2-PlatoonCommand\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 23: cn=2p1s-Section,cn=2-PlatoonCommand,ou=OverlaysContainer,ou=3...\ndn: cn=2p1s-Section,cn=2-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,\n dc=ldap,dc=local\ncn: 2p1s-Section\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 24: cn=2p2s-Section,cn=2-PlatoonCommand,ou=OverlaysContainer,ou=3...\ndn: cn=2p2s-Section,cn=2-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,\n dc=ldap,dc=local\ncn: 2p2s-Section\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 25: cn=2p3s-Section,cn=2-PlatoonCommand,ou=OverlaysContainer,ou=3...\ndn: cn=2p3s-Section,cn=2-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,\n dc=ldap,dc=local\ncn: 2p3s-Section\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 26: cn=3-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,dc=ld...\ndn: cn=3-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,dc=ldap,dc=local\ncn: 3-PlatoonCommand\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 27: cn=3p1s-Section,cn=3-PlatoonCommand,ou=OverlaysContainer,ou=3...\ndn: cn=3p1s-Section,cn=3-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,\n dc=ldap,dc=local\ncn: 3p1s-Section\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nmember: cn=3p1s-GRZEKOBI,cn=users,ou=312klp-ATAK,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 28: cn=3p2s-Section,cn=3-PlatoonCommand,ou=OverlaysContainer,ou=3...\ndn: cn=3p2s-Section,cn=3-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,\n dc=ldap,dc=local\ncn: 3p2s-Section\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 29: cn=3p3s-Section,cn=3-PlatoonCommand,ou=OverlaysContainer,ou=3...\ndn: cn=3p3s-Section,cn=3-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,\n dc=ldap,dc=local\ncn: 3p3s-Section\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 30: cn=4-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,dc=ld...\ndn: cn=4-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,dc=ldap,dc=local\ncn: 4-PlatoonCommand\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 31: cn=4p1s-Section,cn=4-PlatoonCommand,ou=OverlaysContainer,ou=3...\ndn: cn=4p1s-Section,cn=4-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,\n dc=ldap,dc=local\ncn: 4p1s-Section\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 32: cn=4p2s-Section,cn=4-PlatoonCommand,ou=OverlaysContainer,ou=3...\ndn: cn=4p2s-Section,cn=4-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,\n dc=ldap,dc=local\ncn: 4p2s-Section\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 33: cn=4p3s-Section,cn=4-PlatoonCommand,ou=OverlaysContainer,ou=3...\ndn: cn=4p3s-Section,cn=4-PlatoonCommand,ou=OverlaysContainer,ou=312klp-ATAK,\n dc=ldap,dc=local\ncn: 4p3s-Section\nmember: cn=dummyUser,cn=ServiceAccounts,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 34: ou=Groups,dc=ldap,dc=local\ndn: ou=Groups,dc=ldap,dc=local\nobjectclass: organizationalUnit\nobjectclass: top\nou: Groups\n\n# Entry 35: ou=master106,dc=ldap,dc=local\ndn: ou=master106,dc=ldap,dc=local\nobjectclass: organizationalUnit\nobjectclass: top\nou: master106\n\n# Entry 36: cn=users,ou=master106,dc=ldap,dc=local\ndn: cn=users,ou=master106,dc=ldap,dc=local\ncn: users\ngidnumber: 2011\nmemberuid: dummyuser\nmemberuid: user2\nmemberuid: user3\nmemberuid: user1\nobjectclass: posixGroup\nobjectclass: top\n\n# Entry 37: cn=user1,cn=users,ou=master106,dc=ldap,dc=local\ndn: cn=user1,cn=users,ou=master106,dc=ldap,dc=local\ncn: user1\ngidnumber: 2011\nhomedirectory: /home/users/user1\nobjectclass: inetOrgPerson\nobjectclass: posixAccount\nobjectclass: top\nsn: user1\nuid: user1\nuidnumber: 2001\nuserpassword: {MD5}IpMLkzbNXhyj1EHhy5TERQ==\n\n# Entry 38: cn=user2,cn=users,ou=master106,dc=ldap,dc=local\ndn: cn=user2,cn=users,ou=master106,dc=ldap,dc=local\ncn: user2\ngidnumber: 2011\nhomedirectory: /home/users/user2\nobjectclass: inetOrgPerson\nobjectclass: posixAccount\nobjectclass: top\nsn: user2\nuid: user2\nuidnumber: 2002\nuserpassword: {MD5}IpMLkzbNXhyj1EHhy5TERQ==\n\n# Entry 39: cn=user3,cn=users,ou=master106,dc=ldap,dc=local\ndn: cn=user3,cn=users,ou=master106,dc=ldap,dc=local\ncn: user3\ngidnumber: 2011\nhomedirectory: /home/users/user3\nobjectclass: inetOrgPerson\nobjectclass: posixAccount\nobjectclass: top\nsn: user3\nuid: user3\nuidnumber: 2003\nuserpassword: {MD5}IpMLkzbNXhyj1EHhy5TERQ==\n\n# Entry 40: ou=OverlaysContainer,ou=master106,dc=ldap,dc=local\ndn: ou=OverlaysContainer,ou=master106,dc=ldap,dc=local\nobjectclass: organizationalUnit\nobjectclass: top\nou: OverlaysContainer\n\n# Entry 41: cn=group1,ou=OverlaysContainer,ou=master106,dc=ldap,dc=local\ndn: cn=group1,ou=OverlaysContainer,ou=master106,dc=ldap,dc=local\ncn: group1\nmember: cn=dummyUser,ou=aUsers,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 42: cn=group1_READ,ou=OverlaysContainer,ou=master106,dc=ldap,dc=l...\ndn: cn=group1_READ,ou=OverlaysContainer,ou=master106,dc=ldap,dc=local\ncn: group1_READ\nmember: cn=dummyUser,ou=aUsers,dc=ldap,dc=local\nmember: cn=user1,ou=users,ou=master106,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 43: cn=group2,ou=OverlaysContainer,ou=master106,dc=ldap,dc=local\ndn: cn=group2,ou=OverlaysContainer,ou=master106,dc=ldap,dc=local\ncn: group2\nmember: cn=user1,ou=users,ou=master106,dc=ldap,dc=local\nmember: cn=dummyUser,ou=aUsers,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 44: cn=group2_WRITE,ou=OverlaysContainer,ou=master106,dc=ldap,dc=...\ndn: cn=group2_WRITE,ou=OverlaysContainer,ou=master106,dc=ldap,dc=local\ncn: group2_WRITE\nmember: cn=user1,ou=users,ou=master106,dc=ldap,dc=local\nmember: cn=dummyUser,ou=aUsers,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 45: cn=group3,ou=OverlaysContainer,ou=master106,dc=ldap,dc=local\ndn: cn=group3,ou=OverlaysContainer,ou=master106,dc=ldap,dc=local\ncn: group3\nmember: cn=dummyUser,ou=aUsers,dc=ldap,dc=local\nmember: cn=user3,ou=users,ou=master106,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 46: cn=groupALL,ou=OverlaysContainer,ou=master106,dc=ldap,dc=loca...\ndn: cn=groupALL,ou=OverlaysContainer,ou=master106,dc=ldap,dc=local\ncn: groupALL\nmember: cn=dummyUser,ou=aUsers,dc=ldap,dc=local\nmember: cn=user1,ou=users,ou=master106,dc=ldap,dc=local\nmember: cn=user2,ou=users,ou=master106,dc=ldap,dc=local\nmember: cn=user3,ou=users,ou=master106,dc=ldap,dc=local\nobjectclass: groupOfNames\nobjectclass: top\n\n# Entry 47: ou=zzzAfterFreshInstall,dc=ldap,dc=local\ndn: ou=zzzAfterFreshInstall,dc=ldap,dc=local\nobjectclass: organizationalUnit\nobjectclass: top\nou: zzzAfterFreshInstall\n\n# Entry 48: cn=nsspam,ou=zzzAfterFreshInstall,dc=ldap,dc=local\ndn: cn=nsspam,ou=zzzAfterFreshInstall,dc=ldap,dc=local\ncn: nsspam\ndescription: NSS/PAM Access Account\nobjectclass: simpleSecurityObject\nobjectclass: organizationalRole\nuserpassword: Lh34Met3\n\n# Entry 49: cn=samba,ou=zzzAfterFreshInstall,dc=ldap,dc=local\ndn: cn=samba,ou=zzzAfterFreshInstall,dc=ldap,dc=local\ncn: samba\ndescription: SAMBA Access Account\nobjectclass: simpleSecurityObject\nobjectclass: organizationalRole\nuserpassword: Lh34Met3\n\n# Entry 50: ou=Aliases,ou=zzzAfterFreshInstall,dc=ldap,dc=local\ndn: ou=Aliases,ou=zzzAfterFreshInstall,dc=ldap,dc=local\nobjectclass: organizationalUnit\nobjectclass: top\nou: Aliases\n\n# Entry 51: ou=Hosts,ou=zzzAfterFreshInstall,dc=ldap,dc=local\ndn: ou=Hosts,ou=zzzAfterFreshInstall,dc=ldap,dc=local\nobjectclass: organizationalUnit\nobjectclass: top\nou: Hosts\n\n# Entry 52: ou=Idmaps,ou=zzzAfterFreshInstall,dc=ldap,dc=local\ndn: ou=Idmaps,ou=zzzAfterFreshInstall,dc=ldap,dc=local\nobjectclass: organizationalUnit\nobjectclass: top\nou: Idmaps\n\n# Entry 53: ou=Users,ou=zzzAfterFreshInstall,dc=ldap,dc=local\ndn: ou=Users,ou=zzzAfterFreshInstall,dc=ldap,dc=local\nobjectclass: organizationalUnit\nobjectclass: top\nou: Users';

