let g:reporoot=system("git rev-parse --show-toplevel | tr -d '\\n'")
let &path .= "," . g:reporoot . "/**"
