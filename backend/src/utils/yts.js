import sprintf from "sprintf"
import qs from "querystring"

const trackers = [
  'udp://open.demonii.com:1337/announce',
  'udp://tracker.openbittorrent.com:80',
  'udp://tracker.coppersurfer.tk:6969',
  'udp://glotorrents.pw:6969/announce',
  'udp://tracker.opentrackr.org:1337/announce',
  'udp://torrent.gresille.org:80/announce',
  'udp://p4p.arenabg.com:1337',
  'udp://tracker.leechers-paradise.org:6969',
]
const baseMagnet =
`magnet:?xt=urn:btih:%s&dn=%s&tr=${trackers.join('&tr=')}`

export const torrentToMagnet = (hash, name) => sprintf(baseMagnet, hash, qs.escape(name))
