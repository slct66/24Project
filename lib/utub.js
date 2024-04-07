function getAddress(field) {

    var y = 3; //1.åªç”¨youtube; 2.åªç”¨libre tube; 3.ç”¨youtubeç›´æ’­,libre tubeé»žæ’­
    var i = 1; //è«‹è¼¸å…¥ 1 ~ 11 ä¸­çš„ä¸€å€‹æ•¸å­—åˆ‡æ›libre tubeç·šè·¯(é€šå¸¸è¶Šå°è¶Šå¿«)
    var cache_on = 1; //è‹¥è¦é–‹å•Ÿå¿«å–è«‹è¼¸å…¥1(è«‹å…ˆç¢ºèªä¸Šé¢ç·šè·¯å¯ç”¨ï¼Œä¸¦åˆªé™¤æ¥µè‡´çš„cacheç›®éŒ„å†é–‹å•Ÿ);

    var line = [
'https://pipedapi.kavin.rocks',
'https://pipedapi.adminforge.de',
'https://pipedapi.us.projectsegfau.lt',
'https://pipedapi.smnz.de',
'https://pipedapi.astartes.nl',
'https://piapi.ggtyler.dev',
'https://piped-backend.seitan-ayoub.lol',
'https://pipedapi-libre.kavin.rocks',
'https://api.piped.privacydev.net',
'https://api.piped.privacydev.net/',
'https://piped-api.lunar.icu',
]
//    var k = 1;
    var url0 = field.url;
    var shorts;
    var url_next;
    var y1=y;

    var v = getQueryParameter.call({ url: field.url, key: "v" });

    var headers = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.50' };

    if ( cache_on == 1 ) {
       var cache = getCache.call(url0+'-'+y1+'-'+i);
//return cache;
       if (cache != null) {
          if ( cache.match(/next_id/) != null ) {
       } else {
          return JSON.stringify({ url: cache, headers: headers });
          }
       }
       if ( url0 == 'https://shorts-pre' ) {
          return JSON.stringify({ error: 'å‰æ¬¡æœªæ’­æ”¾ï¼' });
       }
       if ( url0 == 'https://shorts-now' ) {
          return JSON.stringify({ error: 'æœªæ›¾æ’­æ”¾ï¼' });
       }
    }


    if ( y == 1 || y == 3 ) {

       if ( url0.match(/streams/) ) {
          url1 = url0.replace('/m.','/www.').replace(/streams\/\d+/,'streams')+'?app=desktop';
          var object = { url: url1, headers: JSON.stringify(headers) };
          var res = get.call(object);
//          var live = res.match(/watch\?v=(.*?)"/g);
//          var live = res.match(/æ¬¡"\}\}\},"descriptionSnippet(.*?)","webPageType"/g);
          var live = res.match(/æ¬¡"\}\}\},"(.*?)","webPageType"/g);
//return live[0];
          var l = live.length;
//return url0.match(/streams\/(.+)/)[1];
          if ( url0.match(/streams\/(.+)/)[1] <= l ) {
             l = l-url0.match(/streams\/(.+)/)[1];
//return url0.match(/streams\/(.+)/)[1];
             live = live[l].match(/v=(.+)/)[1];
// return l;
             url0 = 'https://m.youtube.com/watch?v='+live;
//             url1 = url0+'?app=desktop';
          } else {
             return JSON.stringify({ error: 'è©²é »é“ç›®å‰ç„¡ç›´æ’­ï¼' });
          }
       }

/*//          y = 1;

       } else {
         if ( y == 1 ) {
            return JSON.stringify({ error: 'éžè©²é »é“ç›´æ’­æ™‚é–“ï¼' });
         }
       }
       }*/
       
       if ( url0.match(/shorts/) == null ) {
       url1 = url0.replace('/m.','/www.')+'?app=desktop';
       var object = { url: url1, headers: JSON.stringify(headers) };
       var res = get.call(object);

       if ( res.match(/hlsManifestUrl":"(.*m3u8)/) != null ) {

          var url = res.match(/hlsManifestUrl":"(.*m3u8)/)[1];
          var t = url.match(/expire\/(.*?)\//)[1]*1000-Date.now()-1000;
          var field = { name: field.url+'-'+y1+'-'+i, value: url, expire: ''+t }
          setCache.call(field);
          return JSON.stringify({ url: url, headers: headers });

//          y = 1;

       } else {
         if ( y == 1 ) {
            return JSON.stringify({ error: 'éžè©²é »é“ç›´æ’­æ™‚é–“ï¼' });
         }
       }
    }

    if ( y == 2 ) {
       if ( url0.match(/live/) !=null ){
          var object = { url: url0, headers: JSON.stringify(headers) };
          var res = get.call(object);
          if ( res.match(/hlsManifestUrl":"(.*m3u8)/) != null ) {

             var url = res.match(/hlsManifestUrl":"(.*m3u8)/)[1];
             y = 1;

          } else {
            return JSON.stringify({ error: 'éžè©²é »é“ç›´æ’­æ™‚é–“ï¼' });
          }
       }}
    }
    if ( y == 2 || y == 3 ) {
       if ( url0.match(/\?v=/) !=null ){
          var id = url0.match(/\?v=(.{11})/)[1];
       } else if ( url0.match(/youtu.be\//) !=null ) {
          var id = url0.match(/youtu.be\/(.{11})/)[1];
       } else if ( url0.match(/shorts/) != null ) {
          if ( url0.match(/shorts\/(.{11})/) != null ) {
             var id = url0.match(/shorts\/(.{11})/)[1];
          } else {

             cache = getCache.call('next_id');
             if ( cache != null ) {
                var id = cache;

             } else {
                var id = get.call( {url: url0, headers: JSON.stringify(headers) }).match(/\/shorts\/(.{11})/)[1];
             }

             var shorts = 1;
          }

       } else if ( url0.match(/youtube.com\//) !=null && url0.match(/youtube.com\/(.{11})/) !=null ) {
          var id = url0.match(/youtube.com\/(.{11})/)[1];
       } else {
          return JSON.stringify({ error: 'è©²ç¶²å€éŒ¯èª¤ï¼'+url0 });
       }
/*       var url_l = 'https://piped-instances.kavin.rocks/';

       var headers = { 'User-Agent': 'com.github.libretube/42' };

       var line = getCache.call('Youtube2-line');

       if ( line == null ) {

          var object = { url: url_l, headers: JSON.stringify(headers) };
          var res = get.call(object);

          if ( res.match(/"api_url":"(.*?)"/) == null ) {
             return JSON.stringify({ error: 'è©²æœå‹™å™¨ç„¡æ•ˆï¼' });
          }

          line = res.match(/"api_url":"(.*?)"/g);
          let j = 0;
          let n =  line.length;
          var line2 = '';
          while( j < n ) {
             line[j] = line[j].replace('"api_url":"','');
             line2 += line[j];
             j += 1;
          }
          line = line2.split('"');
          var field = { name: 'YouTube-line', value: line2, expire: "3600" };
          setCache.call(field);
       } else {
          var line = line.split('"');
       }

*/

    var url = line[i-1] + '/streams/'+ id;
    var headers = { 'User-Agent': 'com.github.libretube/45 (Linux; U; Android 10; zh_TW; MI MAX 3; Build/QKQ1.190910.002; Cronet/113.0.5672.61)' };

    var object = { url: url, headers: JSON.stringify(headers) };
    var res = get.call(object);

    if ( res.match(/"hls":"(.*?)"/) != null ) {
       var url = res.match(/"hls":"(.*?)"/)[1];

    } else {
       return JSON.stringify({ error: 'éžè©²é »é“ç›´æ’­æ™‚é–“ï¼' });
    }

    if ( shorts == 1 ) {
       var object = { url: 'https://m.youtube.com/shorts/'+id, headers: JSON.stringify(headers) };
       var res = get.call(object);

       var next_id = res.match(/\\\/shorts\\\/(.{11})/g);
    var n = Math.floor(Math.random()*next_id.length);
       next_id = next_id[n].replace('\\\/shorts\\\/','');
    }
    }

    if ( cache_on == 1 ) {
       var t = url.match(/expire\/(.*?)\//)[1]*1000-Date.now()-1000;
       if ( shorts == 1 ) {

          var cache = getCache.call('https://shorts-now'+'-'+y+'-'+i);
          if ( cache != null ) {
             var field = { name: 'https://shorts-pre'+'-'+y+'-'+i, value: cache, expire: ''+t };
             setCache.call(field);
          }
          var field = { name: 'https://shorts-now'+'-'+y+'-'+i, value: url, expire: ''+t }
          setCache.call(field);
          if ( next_id != null ) {
             var field = { name: 'next_id', value: next_id, expire: '0' };
             setCache.call(field);
          }
       } else {
          var field = { name: url0+'-'+y1+'-'+i, value: url, expire: ''+t }
          setCache.call(field);
       }
    }

    return JSON.stringify({ url: url, headers: headers });

}
