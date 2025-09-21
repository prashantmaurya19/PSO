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
badd +11 src/components/chess-arena/chess-board/index.jsx
badd +42 src/components/chess-arena/move-list-panel/index.jsx
badd +49 src/components/chess-arena/move-list-panel/move-list-table.jsx
badd +43 src/components/chess-arena/move-list-panel/verses-banner.jsx
badd +7 src/components/chess-arena/move-list-panel/function-button.jsx
badd +82 src/components/chess-arena/move-list-panel/move-list-function-button.jsx
badd +1 src/pages/dashboard/dmain/ChessArenaGround.jsx
badd +1 src/components/icon/index.jsx
badd +92 src/components/chess-arena/move-list-panel/oponent-request.jsx
badd +1796 src/util/chess.js
badd +1 src/util/chess.test.js
badd +146 ~/Documents/linux-dotfiles/nvim/.config/nvim/pm_user/lua/pm_user/remaps.lua
badd +73 src/store/feature/component-data/index.js
badd +1 src/components/chess-arena/chess-board/piece-render.jsx
badd +6 src/components/chess-arena/chess-board/board.jsx
badd +27 src/components/icon/fontawesome/index.jsx
badd +38 src/components/chess-arena/chess-board/promotion-piece-overlay.jsx
badd +53 src/components/chess-arena/chess-board/winner-banner-overlay.jsx
badd +57 src/components/loader/chess-board/index.jsx
badd +31 src/components/chess-arena/index.jsx
badd +37 src/store/feature/chess-data/index.js
badd +1 src/store/index.js
badd +94 src/components/chess-arena/player-panel/index.jsx
badd +60 src/util/time.js
badd +26 src/util/log.js
badd +4 src/components/debug/overlay/duration-overlay/index.jsx
badd +6 jsconfig.json
badd +8 src/components/debug/overlay/fen-overlay/index.jsx
badd +7 src/util/event.js
badd +70 src/util/astring.js
badd +19 ~/Documents/linux-dotfiles/nvim/.config/nvim/lua/plugins/telescope.lua
badd +1680 node_modules/@types/react/index.d.ts
badd +76 src/pages/dashboard/dmain/GameDurationMenu.jsx
badd +26 src/pages/dashboard/dmain/index.jsx
badd +68 src/components/buttons/dmenu-button/index.jsx
badd +8 src/components/icon/dashboard/index.jsx
badd +27 src/util/cache.js
badd +11 src/pages/dashboard/index.jsx
badd +5 src/util/astring.test.js
argglobal
%argdel
edit src/components/chess-arena/chess-board/piece-render.jsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
3wincmd h
wincmd w
wincmd w
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
wincmd =
argglobal
balt src/store/feature/component-data/index.js
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
let s:l = 105 - ((17 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 105
normal! 036|
lcd ~/Documents/coding/PSO/frontend
wincmd w
argglobal
if bufexists(fnamemodify("~/Documents/coding/PSO/frontend/src/util/astring.js", ":p")) | buffer ~/Documents/coding/PSO/frontend/src/util/astring.js | else | edit ~/Documents/coding/PSO/frontend/src/util/astring.js | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/coding/PSO/frontend/src/util/astring.js
endif
balt ~/Documents/coding/PSO/frontend/src/util/chess.js
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
let s:l = 70 - ((20 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 70
normal! 03|
lcd ~/Documents/coding/PSO/frontend
wincmd w
argglobal
if bufexists(fnamemodify("~/Documents/coding/PSO/frontend/src/util/astring.test.js", ":p")) | buffer ~/Documents/coding/PSO/frontend/src/util/astring.test.js | else | edit ~/Documents/coding/PSO/frontend/src/util/astring.test.js | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/coding/PSO/frontend/src/util/astring.test.js
endif
balt ~/Documents/coding/PSO/frontend/src/util/chess.test.js
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
let s:l = 5 - ((4 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 5
normal! 016|
lcd ~/Documents/coding/PSO/frontend
wincmd w
argglobal
if bufexists(fnamemodify("~/Documents/coding/PSO/frontend/jsconfig.json", ":p")) | buffer ~/Documents/coding/PSO/frontend/jsconfig.json | else | edit ~/Documents/coding/PSO/frontend/jsconfig.json | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/coding/PSO/frontend/jsconfig.json
endif
balt ~/Documents/coding/PSO/frontend/src/util/astring.test.js
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
lcd ~/Documents/coding/PSO/frontend
wincmd w
4wincmd w
wincmd =
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
