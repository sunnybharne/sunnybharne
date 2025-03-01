### Basic Motions
```Bash
crlt + f # page down
crlt + b # page up
z + enter # moves the current line at the very top
w , W move a word forward
b, B move a word backward
  0 move to the start of the row
_ move to the first word of the line
$ move to the end of the line
gg move to the top of the document
G move to the very bottom of the document
x delete the character under the cursor
X delete the character before the cursor
dd delete the line under the cursor
dw delete the word under the cursor
d$ delete from the cursor to the end of the line
D delete from the cursor to the end of the line
d0 delete from the cursor to the start of the line
idgg delete from the cursor to the top of the document
dG delete from the cursor to the bottom of the document
. repeat the last command
p paste the last deleted text below the cursor (Put)
P paste the last deleted text before the cursor (Put)
yy copy the line under the cursor (Yank)
u undo the last command
ctrl + r redo the last command
r replace the character under the cursor
J join the current line with the next line
f + character find the next character in the line
F + character find the previous character in the line
; to cycle through the last search
, to cycle through the last search in the opposite direction
/ + text search for the text in the document and 
n to cycle through the results and 
N to cycle through the results in the opposite direction
:/s/old/new/g search for old and replace with new globally and confirm each replacement
```

### Insert Commands
```Bash
i insert mode before the cursor
a insert mode after the cursor
o insert mode on the next line
O insert mode on the previous line
A insert mode at the end of the line
I insert mode at the start of the line
```

### Register Types
```Bash
unnamed register or default register: ""
numbered registers: "0, "1, "2, "3, "4, "5, "6, "7, "8, "9
names registers: "a, "b, "c, "d, "e, "f, "g, "h, "i, "j, "k, "l, "m, "n, "o, "p, "q, "r, "s, "t, "u, "v, "w, "x, "y, "z
Black hole register: "_
```

### Macros
```Bash
q + register
after macros is recorded hit q in normal mode
To use the macro use @ + macro register
v for visual mode
ctrl + v for visual block mode
```
