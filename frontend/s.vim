let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Documents/coding/PSO/frontend
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +659 src/util/chess.js
badd +58 src/util/chess.test.js
badd +52 src/store/feature/chess-data/index.js
badd +33 src/components/chess-arena/chess-board/index.jsx
badd +74 ~/Documents/linux-dotfiles/nvim/.config/nvim/pm_user/lua/pm_user/remaps.lua
badd +25 ~/Documents/linux-dotfiles/nvim/.config/nvim/lua/plugins/luasnip.lua
badd +30 src/components/chess-arena/index.jsx
badd +4 src/store/feature/component-data/index.js
badd +1 src/store/feature/app-data/index.js
badd +14 jsconfig.json
badd +1 src/store/index.js
badd +6 src/util/aobject.js
badd +1 src/components/chess-arena/chess-board/promotion-piece-overlay.jsx
badd +1 src/components/chess-arena/chess-board/piece-render.jsx
badd +9 src/components/chess-arena/chess-board/board.jsx
badd +27 src/components/debug/overlay/fen-overlay/index.jsx
badd +1 src/util/tailwind.js
badd +4 src/util/jjsx.js
badd +5 src/components/loader/chess-board/index.jsx
badd +10 src/pages/dashboard/dmain/GameDurationMenu.jsx
badd +57 src/util/cache.js
badd +2 src/store/feature/settings/index.js
badd +21 src/util/time.js
argglobal
%argdel
edit src/pages/dashboard/dmain/GameDurationMenu.jsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 79 + 79) / 159)
exe 'vert 2resize ' . ((&columns * 79 + 79) / 159)
argglobal
balt src/store/feature/chess-data/index.js
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
let s:l = 9 - ((8 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 9
normal! 0
lcd ~/Documents/coding/PSO/frontend
wincmd w
argglobal
if bufexists(fnamemodify("~/Documents/coding/PSO/frontend/src/util/time.js", ":p")) | buffer ~/Documents/coding/PSO/frontend/src/util/time.js | else | edit ~/Documents/coding/PSO/frontend/src/util/time.js | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/coding/PSO/frontend/src/util/time.js
endif
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
let s:l = 21 - ((18 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 21
normal! 03|
lcd ~/Documents/coding/PSO/frontend
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 79 + 79) / 159)
exe 'vert 2resize ' . ((&columns * 79 + 79) / 159)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
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
