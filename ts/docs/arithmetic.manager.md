# arithmetic manager

used for fast arithmetic operations

```
memory = [ isReady, operation, operant1, operant2, ... ]
```

```
operations = {
  1: "+",
  2: "-",
  3: "*",
  4: "/"
}
```

for example:
task: 10+10

```
$         switch manager to next
}}        manager pointer + 2
!10+      runner cell + 50 used turbo
.         write from runner cell to manager cell
[-]       cicle to runner cell = 0
}
!10+. [-]
!2{       manager pointer - 2 used turbo
+. [-]
{
+.
,         write from manager cell to runner cell
$.
```

and another option, without zeroing cycles, which is more incomprehensible and faster:

```
$         switch manager to next
}}        manager pointer + 2
!10+      runner cell + 50 used turbo
.         write from runner cell to manager cell
}
.
!2{       manager pointer - 2 used turbo
!9-.
{
.
,         write from manager cell to runner cell
$.
```
