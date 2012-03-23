#!/usr/bin/python

html_escape_table = {
   "&": "&amp;",
   '"': "&quot;",
   "'": "&apos;",
   ">": "&gt;",
   "<": "&lt;",
   }

def html_escape(text):
  return "".join(html_escape_table.get(c,c) for c in text)

f = open('bk.gif','r');
try:
  bytesRead = 0;
  chars = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  while len(chars) >=16 :
    filePlace = hex(bytesRead)
    filePlace = filePlace[2:]
    lineout = filePlace
    for i in range(4-len(filePlace)):
      lineout = '0'+lineout
    lineout += ': '  

    chars = f.read(16);
    bytesRead = bytesRead+len(chars)
    textOut = ''
    for i in range(len(chars)):
      h = hex(ord(chars[i]));
      h = h[2:]
      if len(h) == 1: h = '0'+h
      lineout += h;
      if ord(chars[i]) >= 127 or ord(chars[i])<=31:
        textOut += '.'
      else: textOut += chars[i]

    lineout += ' '+textOut

    lineout = html_escape( lineout)
    lineout += "<br/>"
    print lineout
finally:
  f.close();
