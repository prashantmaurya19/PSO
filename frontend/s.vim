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
badd +78 src/components/chess-arena/chess-board/index.jsx
badd +34 src/components/chess-arena/move-list-panel/index.jsx
badd +7 src/components/chess-arena/move-list-panel/move-list-table.jsx
badd +43 src/components/chess-arena/move-list-panel/verses-banner.jsx
badd +7 src/components/chess-arena/move-list-panel/function-button.jsx
badd +56 src/components/chess-arena/move-list-panel/move-list-function-button.jsx
badd +1 src/pages/dashboard/dmain/ChessArenaGround.jsx
badd +38 src/components/icon/index.jsx
badd +92 src/components/chess-arena/move-list-panel/oponent-request.jsx
badd +876 src/util/chess.js
badd +100 src/util/chess.test.js
badd +25 ~/Documents/linux-dotfiles/nvim/.config/nvim/pm_user/lua/pm_user/remaps.lua
badd +29 src/store/feature/component-data/index.js
badd +93 src/components/chess-arena/chess-board/piece-render.jsx
badd +27 src/components/chess-arena/chess-board/board.jsx
badd +27 src/components/icon/fontawesome/index.jsx
badd +38 src/components/chess-arena/chess-board/promotion-piece-overlay.jsx
badd +53 src/components/chess-arena/chess-board/winner-banner-overlay.jsx
badd +57 src/components/loader/chess-board/index.jsx
badd +31 src/components/chess-arena/index.jsx
badd +106 src/store/feature/chess-data/index.js
badd +1 src/store/index.js
badd +85 src/components/chess-arena/player-panel/index.jsx
badd +69 src/util/time.js
badd +26 src/util/log.js
badd +9 src/components/debug/overlay/duration-overlay/index.jsx
badd +13 jsconfig.json
badd +8 src/components/debug/overlay/fen-overlay/index.jsx
argglobal
%argdel
edit src/components/chess-arena/player-panel/index.jsx
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
balt src/util/chess.js
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
let s:l = 87 - ((15 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 87
normal! 05|
lcd ~/Documents/coding/PSO/frontend
wincmd w
argglobal
if bufexists(fnamemodify("~/Documents/coding/PSO/frontend/src/util/time.js", ":p")) | buffer ~/Documents/coding/PSO/frontend/src/util/time.js | else | edit ~/Documents/coding/PSO/frontend/src/util/time.js | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/coding/PSO/frontend/src/util/time.js
endif
balt ~/Documents/coding/PSO/frontend/src/components/chess-arena/index.jsx
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
let s:l = 72 - ((21 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 72
normal! 026|
lcd ~/Documents/coding/PSO/frontend
wincmd w
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
