# Merchant Terminal App


## Ownership + Approval

Production is master; staging + dev will have just notification. This will be via CODEOWNER mechanism



-  install adb [android-platform-tools]

```shell
$ brew cask install android-platform-tools
```

-  check current devices

```shell
$ adb devices
```

-  set metro tcp connection 

```shell
$ adb reverse tcp:8081 tcp:8081
```

```shell
$ adb reverse --list
```

