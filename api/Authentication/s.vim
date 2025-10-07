let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Documents/coding/PSO/api/Authentication
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +10 src/main/resources/application.yml
badd +34 pom.xml
badd +3 src/main/java/com/PlayChess/com/Authentication/Surrogate/UserFieldMask.java
badd +55 src/main/java/com/PlayChess/com/Authentication/Pojo/User.java
badd +3 src/main/java/com/PlayChess/com/Authentication/Services/UserService.java
badd +3 src/main/java/com/PlayChess/com/Authentication/TransLayer/UserAndUserEntityLayer.java
badd +6 src/main/java/com/PlayChess/com/Authentication/TransLayer/CacheLayer.java
badd +15 src/main/java/com/PlayChess/com/Authentication/Controllers/RegistrationController.java
badd +72 src/main/java/com/PlayChess/com/Authentication/Controllers/UserController.java
badd +10 src/main/java/com/PlayChess/com/Authentication/Utils/StringUtil.java
badd +20 src/main/java/com/PlayChess/com/Authentication/Utils/JwtUtil.java
badd +15 src/main/java/com/PlayChess/com/Authentication/Configurations/RedisConfig.java
badd +18 src/main/java/com/PlayChess/com/Authentication/Configurations/DevConfig.java
badd +17 src/main/java/com/PlayChess/com/Authentication/Cache/RedisCache.java
badd +4 .gitignore
argglobal
%argdel
edit src/main/java/com/PlayChess/com/Authentication/Services/UserService.java
argglobal
balt src/main/java/com/PlayChess/com/Authentication/Cache/RedisCache.java
setlocal foldmethod=manual
setlocal foldexpr=0
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
silent! normal! zE
let &fdl = &fdl
let s:l = 6 - ((5 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 6
normal! 029|
lcd ~/Documents/coding/PSO/api/Authentication
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
