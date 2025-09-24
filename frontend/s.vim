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
badd +30 src/components/chess-arena/chess-board/index.jsx
badd +38 src/components/chess-arena/move-list-panel/index.jsx
badd +131 src/components/chess-arena/move-list-panel/move-list-table.jsx
badd +43 src/components/chess-arena/move-list-panel/verses-banner.jsx
badd +7 src/components/chess-arena/move-list-panel/function-button.jsx
badd +84 src/components/chess-arena/move-list-panel/move-list-function-button.jsx
badd +23 src/pages/dashboard/dmain/ChessArenaGround.jsx
badd +1 src/components/icon/index.jsx
badd +69 src/components/chess-arena/move-list-panel/oponent-request.jsx
badd +1795 src/util/chess.js
badd +1 src/util/chess.test.js
badd +76 ~/Documents/linux-dotfiles/nvim/.config/nvim/pm_user/lua/pm_user/remaps.lua
badd +73 src/store/feature/component-data/index.js
badd +150 src/components/chess-arena/chess-board/piece-render.jsx
badd +1 src/components/chess-arena/chess-board/board.jsx
badd +27 src/components/icon/fontawesome/index.jsx
badd +38 src/components/chess-arena/chess-board/promotion-piece-overlay.jsx
badd +53 src/components/chess-arena/chess-board/winner-banner-overlay.jsx
badd +57 src/components/loader/chess-board/index.jsx
badd +11 src/components/chess-arena/index.jsx
badd +50 src/store/feature/chess-data/index.js
badd +9 src/store/index.js
badd +103 src/components/chess-arena/player-panel/index.jsx
badd +55 src/util/time.js
badd +26 src/util/log.js
badd +4 src/components/debug/overlay/duration-overlay/index.jsx
badd +7 jsconfig.json
badd +8 src/components/debug/overlay/fen-overlay/index.jsx
badd +7 src/util/event.js
badd +53 src/util/astring.js
badd +19 ~/Documents/linux-dotfiles/nvim/.config/nvim/lua/plugins/telescope.lua
badd +1680 node_modules/@types/react/index.d.ts
badd +1 src/pages/dashboard/dmain/GameDurationMenu.jsx
badd +18 src/pages/dashboard/dmain/index.jsx
badd +68 src/components/buttons/dmenu-button/index.jsx
badd +8 src/components/icon/dashboard/index.jsx
badd +34 src/util/cache.js
badd +5 src/pages/dashboard/index.jsx
badd +6 src/util/astring.test.js
badd +50 src/util/acookie.js
badd +36 src/util/requests.js
badd +39 src/store/feature/sockjs-socket/socket.js
badd +1 src/store/feature/sockjs-socket/index.js
badd +163 src/util/socket.js
badd +1 src/pages/dashboard/dtooltip-menu/index.jsx
badd +14 src/pages/dashboard/dmain/DashboardInitializationPage/index.jsx
badd +7 src/pages/dashboard/dmain/BotPlayCreateMenu.jsx
badd +73 src/pages/dashboard/dmain/DashboardInitializationPage/initializer.jsx
badd +27 src/components/loader/form/index.jsx
badd +21 src/App.jsx
badd +38 src/store/feature/initialization-data/index.js
badd +2 src/pages/dashboard/dmain/DashboardInitializationPage/security.jsx
badd +1 src/pages/dashboard/dmain/DashboardInitializationPage/security-task.jsx
badd +25 src/pages/dashboard/dmain/DashboardInitializationPage/tasks.jsx
badd +1 .gitignore
badd +32 src/util/acookie.test.js
badd +56 src/var-data/initialization-data.js
argglobal
%argdel
edit src/components/chess-arena/index.jsx
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
balt src/pages/dashboard/dmain/DashboardInitializationPage/initializer.jsx
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
let s:l = 2 - ((1 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 2
normal! 02|
lcd ~/Documents/coding/PSO/frontend
wincmd w
argglobal
if bufexists(fnamemodify("~/Documents/coding/PSO/frontend/src/components/chess-arena/move-list-panel/move-list-function-button.jsx", ":p")) | buffer ~/Documents/coding/PSO/frontend/src/components/chess-arena/move-list-panel/move-list-function-button.jsx | else | edit ~/Documents/coding/PSO/frontend/src/components/chess-arena/move-list-panel/move-list-function-button.jsx | endif
if &buftype ==# 'terminal'
  silent file ~/Documents/coding/PSO/frontend/src/components/chess-arena/move-list-panel/move-list-function-button.jsx
endif
balt ~/Documents/coding/PSO/frontend/src/pages/dashboard/dmain/ChessArenaGround.jsx
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
let s:l = 140 - ((21 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 140
normal! 09|
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
