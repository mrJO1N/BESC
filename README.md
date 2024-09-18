Brainfuck Extended Set of Chars (BESC)

another dialect of an esoteric programming language, but with cardinal differences.

Brainfuck has capabilities only for console applications like a calculator, and my implementation in the future will have GUI capabilities, sound control, multithreading and external connections.

like a Swiss knife - bad opener, bad scissors, bad pliers, but always useful

example calculator:
task: 50+10

```
$         switch manager to next
}}        manager pointer + 2
!50+      runner cell + 50 used turbo
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

<!--
chains ()\_|
mem ${}
addict ^`
-->
