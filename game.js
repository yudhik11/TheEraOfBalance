function start_game(){
    var ggameid = 0,
        ggamelocal = 0,
        tb = {};
    tbmake();
    var _All_pens = {
            total: 0,
            first: null,
            last: null
        },
        _All_tile_kinds = {
            total: 0,
            first: null,
            last: null
        },
        _Camera_size_x = 0,
        _Camera_size_y = 0,
        _Camera_x = 0,
        _Camera_y = 0,
        _Farmer = null,
        _Flower = null,
        _Game_state = 0,
        _Grain = null,
        _Grass = null,
        _Grid = null,
        _Guy_who_is_talking = null,
        _Guys_list = {
            total: 0,
            first: null,
            last: null
        },
        _Horse = null,
        _Horsey = null,
        _Invisible_wall = null,
        _Is_Mac = !1,
        _Lock = null,
        _Man = null,
        _Mountain = null,
        _Ocean = null,
        _Octopus = null,
        _Pig = null,
        _Piggy = null,
        _Rose = null,
        _S = null,
        _Seedling = null,
        _Sheep = null,
        _Sign_Post = null,
        _Tile_size = 0,
        _Tile_that_is_talking = null,
        _Touch_start_x = 0,
        _Touch_start_y = 0,
        _Tree = null,
        _Wind = null,
        _Woman = null,
        _You = null,
        _You_image = null,
        _Zoo_tree = null,
        _Zoohouse = null,
        _Zookeeper = null,
        gloop = function() {
            // document.getElementById('galldiv').innerHTML = "";
            requestAnimationFrame(gloop), tb.updateshould() && (_Main_Loop(), tb.glis && tb.ggl.draw(), tb.update())
        };

    function _All_penned() {
        for (var t = null, e = _Guys_list.first; e;) {
            if ((t = e.val).Kind != _Man && t.Kind != _Woman && t.Kind != _Sheep && !t.Penned) return !1;
            e = e.next
        }
        return !0
    }

    function _Camera_update() {
        _Camera_size_x = Math.ceil(tb.screensizex / _Tile_size) + 1, _Camera_size_y = Math.ceil(tb.screensizey / _Tile_size) + 1, _Camera_x = _You.X, _Camera_y = _You.Y
    }

    function _Convert_map() {
        var t = "",
            e = null,
            g = 0,
            i = 0;
        for (i = 1; i <= tb.arrayheightget(_Grid) - 1; i++)
            for (g = 1; g <= tb.arraylengthget(_Grid); g++) null == (e = _Grid[g][i]) && tb.notificationcancel(0), t += e.Kind.Letter;
        tb.debugset(t)
    }

    function _Draw_guys(t) {
        for (var e = null, g = null, i = {
                total: 0,
                first: null,
                last: null
            }, n = !1, o = _Guys_list.first; o;) e = o.val, Math.floor(e.Y + .5) == t && tb.listpush(2, i, e), o = o.next;
        n = !0;
        for (var s = 0; n;) {
            if (s++ > 999999) throw {
                line: 7,
                message: "Infinite While Loop"
            };
            n = !1, g = null;
            for (var a = i.first; a;) {
                if (e = a.val, null != g && e.Y < g.Y) {
                    tb.listremove(12, i, e), tb.listinsertbefore(13, i, e, g), n = !0;
                    break
                }
                g = e, a = a.next
            }
        }
        for (var r = i.first; r;)(e = r.val)._Draw(), r = r.next
    }

    function _Draw_main_menu() {
        var t = 0,
            e = 0,
            g = !1,
            i = 0;
        for (i = tb.screensizey / 13, tb.screensizey > tb.screensizex && (i = tb.screensizex / 13), tb.cls({
                r: 20,
                g: 130,
                b: 255,
                a: 255
            }), tb.rngsetup(2), tb.fontsizeset(2 * i), tb.transparencyset(.7), e = 1; e <= 44; e++) tb.textdrawcentered("☁", tb.mod(tb.randomint(1, 3 * tb.screensizex) + tb.loops, 3 * tb.screensizex) - tb.screensizex, tb.randomint(1, tb.screensizey));
        tb.transparencyset(0), tb.fontsizeset(1.2 * i), tb.colorset({
            r: 252,
            g: 252,
            b: 254,
            a: 255
        }), tb.textdrawcentered("The Era Of Balance", tb.screensizex / 2, 2 * i), t = 2 * i, e = 4.7 * i, g = !!tb.rectshit(tb.touchx, tb.touchy, 0, 0, tb.screensizex / 2 - 3 * t / 2, e - 1.3 * t / 2, 3 * t, 1.3 * t), tb.mousedownany && g && (e += 1), tb.fontsizeset(t), tb.offsetset(tb.screensizex / 2, e), tb.scaleset(3, 1.3), tb.textdrawcentered("🔲", 0, 0), tb.scaleset(1, 1), tb.offsetset(0, 0), tb.fontsizeset(.8 * i), tb.colorset({
            r: 0,
            g: 72,
            b: 232,
            a: 255
        }), tb.textdrawcentered("Play ▶", tb.screensizex / 2, e - .1 * i), 1 && g && (_Game_state = 4), tb.colorset({
            r: 237,
            g: 237,
            b: 249,
            a: 255
        }), 
        tb.fontsizeset(.4 * i), tb.mobile ? tb.textdrawcentered("Press where you want to go, tap yourself to interact.", tb.screensizex / 2, 6.6 * i) : tb.textdrawcentered("Arrow keys or WASD to move, space to interact.", tb.screensizex / 2, 6.6 * i), 
        
        // tb.fontsizeset(.5 * i), tb.textdrawcentered("Coded on my iPhone in", tb.screensizex / 2, 7.6 * i), 
        // e = 9.2 * i, t = 1.3 * i, g = !!tb.rectshit(tb.touchx, tb.touchy, 0, 0, tb.screensizex / 2 - 4 * t / 2, e - 1.3 * t / 2, 4 * t, 1.3 * t), tb.mousedownany && g && (e += 1), 
        // tb.fontsizeset(t), tb.offsetset(tb.screensizex / 2, e), tb.scaleset(4.1, 1.3), tb.textdrawcentered("🔲", 0, 0), tb.scaleset(1, 1), tb.offsetset(0, 0), tb.mouseclickedany && g && tb.browseropen("http://touchbasicapp.com"), tb.fontsizeset(.5 * i), tb.colorset({
        // 	r: 0,
        // 	g: 81,
        // 	b: 158,
        // 	a: 255
        // }), 
        tb.textdrawcentered("", tb.screensizex / 2, e - .1 * i)
    }

    function _Draw_map() {
        var t, e, g = 0,
            i = 0,
            n = 0,
            o = 0,
            s = null,
            a = null,
            r = 0,
            m = 0;
        for (t = _Camera_x - tb.screensizex / 2 / _Tile_size, e = _Camera_y - tb.screensizey / 2 / _Tile_size, tb.cls(tb.colormake(44, 166, 44, 255)), m = -3; m <= _Camera_size_y; m++) {
            for (r = -4; r <= _Camera_size_x; r++)
                if (s = _Tile_get(Math.floor(t) + r, o = Math.floor(e) + m), !(r < 0 || m < 0) || null != s && s.Kind == _Zoohouse) {
                    if (i = (r + 0 - tb.mod(t, 1)) * _Tile_size, n = (m + 0 - tb.mod(e, 1)) * _Tile_size, a = _Mountain, g = 0, null != s) {
                        if (s.Kind == _Grass) continue;
                        a = s.Kind, i += s.Add_X * _Tile_size, n += s.Add_Y * _Tile_size, g = s.Angle
                    }
                    a.walkable && (n -= a.Size / 4 * _Tile_size), tb.colorset(a.color), tb.fontsizeset(_Tile_size * a.Emoji_size), a == _Lock && (s.Locked ? (a.Emoji = "🔒", tb.transparencyset(.4)) : (a.Emoji = "🔓", tb.transparencyset(.7))), a == _Ocean && (tb.rectdraw(i - _Tile_size / 2, n - _Tile_size / 2, _Tile_size, _Tile_size), tb.transparencyset(.7)), a == _Wind && (tb.transparencyset(.7), _Grid[s.X + 1][s.Y].Kind != _Wind && tb.transparencyset(.7 + tb.mod(2 * tb.loops, _Tile_size) / _Tile_size * .29), i += tb.mod(2 * tb.loops, _Tile_size), n += .2 * _Tile_size), tb.textdrawrotated(a.Emoji, i, n, g), tb.transparencyset(0), a == _Sign_Post && _Tile_that_is_talking == s && (tb.fontsizeset(4.5 * _Tile_size), tb.textdrawcentered("🗯", i + 2.1 * _Tile_size, n + -2.2 * _Tile_size), tb.colorset(tb.colormake(0, 0, 0, 255)), tb.fontsizeset(.4 * _Tile_size), tb.textdrawcentered("⚠", i + 2.1 * _Tile_size, n - 3.4 * _Tile_size), tb.textdrawcentered("Windy Pass", i + 2.1 * _Tile_size, n - 2.9 * _Tile_size), tb.fontsizeset(.3 * _Tile_size), tb.textdrawcentered("None can pass.", i + 2.1 * _Tile_size, n - 2.4 * _Tile_size), tb.textdrawcentered("It's always too windy.", i + 2.1 * _Tile_size, n - 2.1 * _Tile_size), tb.textdrawcentered("Cross the river instead.", i + 2.1 * _Tile_size, n - 1.8 * _Tile_size))
                } _Draw_guys(o), tb.offsetset(0, 0)
        }
    }

    function _Main_Loop() {
        var t = null,
            e = 0;
        if (tb.resized && _Resized(), tb.mousehitany && (_Touch_start_x = tb.touchx, _Touch_start_y = tb.touchy), null == _Grid) {
            if (!tb.assetsallloaded()) return;
            _Setup_map_2(), _Game_state = 1
        }
        if (1 != _Game_state && _Camera_update(), 4 == _Game_state) {
            for (var g = _Guys_list.first; g;) g.val._Update(), g = g.next;
            _Tap_to_dismount(), _Tap_to_pick_up_item()
        }
        if (1 != _Game_state) {
            _Draw_map(), null != _Guy_who_is_talking && (_Guy_who_is_talking.Bob += 15), tb.fontsizeset(.3 * _Tile_size);
            for (var i = _Guys_list.first; i;)(t = i.val).Kind != _Man && t.Kind != _Woman && (t.Penned || tb.transparencyset(.6), e += .5 * _Tile_size, tb.textdrawcentered(t.Kind.Emoji, e, .4 * _Tile_size), tb.transparencyset(0)), i = i.next
            var cnt=0;
            var chld = 0;
            for (var i = _Guys_list.first; i;){
                (t = i.val);
                if (t.Penned && t.Kind == _Sheep) {
                    chld=1;
                }
                else if(t.Kind != _Man && t.Kind != _Woman && t.Penned){
            		// console.log("Kind : ", t.Kind);
            		cnt++;
            	}
                i=i.next;
            }
            var pp = cnt*25;
            // console.log(chld, pp, cnt);
            if (chld==1){
                document.getElementById("myBar").style.width = "0%";
                document.getElementById("myBar").className = "progress-bar progress-bar-striped bg-danger";
            }
            else if (pp==0){
                document.getElementById("myBar").style.width = "10%";
                document.getElementById("myBar").className = "progress-bar progress-bar-striped bg-danger";
            }
            else if (pp==25){
                document.getElementById("myBar").style.width = "33%";
                document.getElementById("myBar").className = "progress-bar progress-bar-striped bg-warning";
            }
            else if (pp==50){
                document.getElementById("myBar").style.width = "66%";
                document.getElementById("myBar").className = "progress-bar progress-bar-striped bg-info";
            }
            else if(pp>0){
                document.getElementById("myBar").style.width = "100%";
                document.getElementById("myBar").className = "progress-bar progress-bar-striped bg-success";
            }
            
        } else {
            _Draw_main_menu();
            _Draw_map(), null != _Guy_who_is_talking && (_Guy_who_is_talking.Bob += 15), tb.fontsizeset(.3 * _Tile_size);
            for (var i = _Guys_list.first; i;)(t = i.val).Kind != _Man && t.Kind != _Woman && (t.Penned || tb.transparencyset(.6), e += .5 * _Tile_size, tb.textdrawcentered(t.Kind.Emoji, e, .4 * _Tile_size), tb.transparencyset(0)), i = i.next
        }
    }

    function _On_Tap() {}

    function _Resized() {
        _Tile_size = tb.screensizey > tb.screensizex ? tb.screensizey / 13 : tb.screensizex / 13
    }

    function _Setup_guy_kinds() {
        var t = null;
        (t = new _Create_Guy_kind_class).Name = "Woman", t.Emoji = "🐕", t.Emojisize = .8, t.Unrideable = !0, _Woman = t, (t = new _Create_Guy_kind_class).Name = "Man", t.Emoji = "🐄", t.Emojisize = .8, t.Unrideable = !0, _Man = t, (t = new _Create_Guy_kind_class).Name = "Octopus", t.Emoji = "🧜‍", t.Emojisize = .6, _Octopus = t, (t = new _Create_Guy_kind_class).Name = "Horse", t.Emoji = "🏃‍♂️", t.Emojisize = 1, _Horse = t, (t = new _Create_Guy_kind_class).Name = "Sheep", t.Emoji = "👶", t.Emojisize = .8, _Sheep = t, (t = new _Create_Guy_kind_class).Name = "Pig", t.Emoji = "🚶‍", t.Emojisize = .8, _Pig = t
        //(t = new _Create_Guy_kind_class).Name = "Woman", t.Emoji = "🚶‍♀️", t.Emojisize = .8, t.Unrideable = !0, _Woman = t, (t = new _Create_Guy_kind_class).Name = "Man", t.Emoji = "🚶‍♂️", t.Emojisize = .8, t.Unrideable = !0, _Man = t, (t = new _Create_Guy_kind_class).Name = "Octopus", t.Emoji = "🐙", t.Emojisize = .6, _Octopus = t, (t = new _Create_Guy_kind_class).Name = "Horse", t.Emoji = "🐎", t.Emojisize = 1, _Horse = t, (t = new _Create_Guy_kind_class).Name = "Sheep", t.Emoji = "🐑", t.Emojisize = .8, _Sheep = t, (t = new _Create_Guy_kind_class).Name = "Pig", t.Emoji = "🐖", t.Emojisize = .8, _Pig = t
    }

    function _Setup_guys() {
        (_Piggy = new _Create_Guy_class).X = 6, _Piggy.Y = 10, _Piggy.Speed = .1, _Piggy.Kind = _Pig, (_You = new _Create_Guy_class).X = 23, _You.Y = 23, _You.Speed = .11, _You.Kind = _Horse, (_You = new _Create_Guy_class).X = 29, _You.Y = 27, _You.Speed = .08, _You.Kind = _Octopus, (_You = new _Create_Guy_class).X = 44, _You.Y = 11, _You.Speed = .06, _You.Kind = _Sheep, (_Zookeeper = new _Create_Guy_class).X = 39, _Zookeeper.Y = 15, _Zookeeper.Speed = .1, _Zookeeper.Kind = _Man, (_Farmer = new _Create_Guy_class).X = 11, _Farmer.Y = 30, _Farmer.Speed = .1, _Farmer.Kind = _Man, (_You = new _Create_Guy_class).X = 41, _You.Y = 13, _You.Speed = .1, _You.Kind = _Woman, _You_image = tb.imagemake(_Tile_size, _Tile_size), tb.drawtocanvas(50, _You_image), tb.fontsizeset(_Tile_size * _You.Kind.Emojisize), tb.textdrawrotated(_You.Kind.Emoji, _Tile_size * _You.Kind.Emojisize * 0, _Tile_size * _You.Kind.Emojisize * .05, 0), tb.drawtoscreen(53)
    }

    function _Setup_map_2() {
        var t = 0,
            e = "",
            g = null,
            i = "",
            n = null,
            o = null,
            s = 0,
            a = 0;
        for (i = "mmmmmmmmmmmmmmmmmmommmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmttttoottttttttmmmmmttmtttttttttttttttmmmmmmmmmmmmmmmmmmmmtmmttmmmmoommtttttttttttmmttttttttttttttttttttmtmmmmmmmmmmmmmttttttttttootttgggggttttttppppptppppptppppptppppptttmmmmmmmtmtttffggggfgoogggggggggtttttpwggptpoooptpgggptpgggptttmmmmmmtttgfggggggggooogggggggggtttttpgggptpgggptpgggptpgggptttmmmmmmtfggfggggggggooogggggggggtgtttpgggptpgggptpgggptpgggptttmmmmmmtfggggttgggggooogggggggggtttttpplpptpplpptpplpptpplpptttmmmmmmtgggggggggggooooggggggggggttttgggggggggggggggggggggggtttmmmmmmmtggggooooooooooggggggggggggttggggggggggggggggggggggtttttmmmmmmtgggoooooooooooggggfgggggggttggggggggggggggggggggggtttttmmmmmmmggmmooooooooogggggggggggggttggggggggggggggggggggttttttttmWWWWWWWWgggooooooggggggggggggggttziiiiggggggggggggtttttttttttmmmmmgggggggggggggggggggggfggggggtiiiiiggggggggggttttttttttfttmmmttSgggggggggggggggggggggggggggtiiiiiggggggggttttttttttgttttmmtttgggggggggggfggggfgggggggggggtiiiiigggtttttttttttttttgttttmmtttgggggggggggggggggggggggggggggrrrrrfggfgggggggtgtgtgttttttmmtttgggggggfggggggggggfggggggggggrrrrrfggfgggggggttttgttgttmtmmttggggggggggggggtggggggggggggtgggggggfggfggfggggfgtttggtttmtmmttfggggggggggggggggggggggggggggggggggggggggggggggggttttttgmtmmttgggggggggggggggggggggggggggggggggggggggggggggggggttgtttgmtmgttggtggggggggggggggggtggggfggggggggggggggggggggggggggttttgtmmmttfgtwwwgwwwggggggggggggfgggggggggggggggggggggggggggggtttttmmmttfgtwwwgwwwggggggggfggggggggggggggfggggfgggggggggggggggtttmmmttfgtwwwgwwwggggggfggggggggggggfgggggggggggggfgggggggggggttmmmttggtwwwgwwwggggggggggggoooooggggggggggggggggggggtgggggtggtmmmttggtwwwgwwwgggggggtggggoooooogggggfgggggggggggggggggtggggtmmmttgggwwwgwwwgfggggggggggtooootgggggggggggggggggggggggggggfgmtmtttggwwwgwwwggfggggggggfgggggggggggggggggggtggtgtggggtgtgggttmtgttggggggggggggggggggggggggggggggggggggggggggggggggggggtggttmtttggggggggggggggggggggggggggggggggfggggtgggggggggggggtgggtttmtttggsssgggggggggggggfggggggggggggggggggggtggggtggtgggggggmttmmttggsssgggfgggggggggggggggggggggggggggggggggggggggggtggttttmmmtggggggggggggtgggggggggggggfgggggfgggggrgggtgggggggggggttmmmmttgggggggggggggggggggggggggggggggggggggggggggggtgtggggtttmmmmmttggggggggggggggggggggttggggggggggttgtggrgfggtggggggttttmmtmmmttggrggtggggggggggggggtgggggggggggtggggggfgtgggrgftttmmgmmmmmmgtggggggggggggggggggggggtggggttttgggggrgggggggggtttmmggmmttmmmtttgggggggrggggggfggggggggggggggggtgtgggfgrggttttmmmgmmgmttmmmtttggggggggggggggggggggggggggggggggfgfggggggttttmfmmmggmgttgmmmttggggggggtgggggtgggggggggggggggggggggrggttttmmgmmmggmgggtmmmmttgggggggggggggtgggtggggfggggggggggfggggtgtmtmgmmgggmtgggmmmmmttggtggggggtggggggggggggggggggggggggtgftttmmttgmgggmtgggmmtmmmttgggggggggtgtgggggggggggggfgggggggfggtttmmtggmtmmtggggmmttmmmttggggggggggtttgggggggggggggfgggggggttttmmtgmmmgmgggggmmgtmmmmttggggtgggggttttgggggggggggggggggggttttgmtgmgmgmgggggmmgmmmmmmmtggggttgggggttttggggtggggggggggggttttmmtgmgmgmfgtgtmmgmfmmmmmmtttgggtttgggggttttggggggggggggggttttmmtggmmmggggtgmmmmggmmmmmmmttggggtttggggggtttgggggggggggggtttmmttggmmggggggmmmmggtmmmmmmmttgggggtttggggggggggggggggggggtgtmmtgggmgmgggmmmmmmgggtmmmmmmmtttgggggttttgggggggggggggggfttgtgmttgtmgmgtmmmtggmgggtmtmmmmmmmtttgggggttttgggggggggggggggtttgmmtmmmgmttmgmgggmmgggmmmmmmmmmmtmttgfgggttttttgggggggggggtgtmttggmmgggmggmmgmmmgfgmmtmmmmmmmttmtttttggggtttttggggggttttttgmtggmmmmmggmmgggggggmttttmmmmmmmttmttttttfggttttttggggggggtttmgtgmmmmggmmggmmmgmmtttttmmmmmmmmmmmtttttttggggggggggggfgtttmmgtgmmgggttmmmmtmmtftttttgmmmmmmmmmmmmmttmmtttttttttttttttttmmmtmmmmmmmmmmmmmmmttmmtmttmmmmmmmmmmmmmmmmmmmmmtttttttttttttmmtmmmmttmmmmmmtmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmtmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm", _Grid = tb.arraymake(49, null, 62, 60), s = 1, a = 1, t = 1; t <= i.length; t++) {
            (n = new _Create_Tile_class).X = s, n.Y = a, _Grid[s][a] = n, e = tb.stringpart(i, t, 1, 58);
            for (var r = _All_tile_kinds.first; r;) {
                if ((o = r.val).Letter == e) {
                    n.Kind = o;
                    break
                }
                r = r.next
            }
            null == n.Kind && (tb.debugset("" + s), tb.debugset("" + a), tb.debugset("" + t), tb.debugset("" + g[t]), tb.debugset("" + g[t + 1]), tb.runtimeerror(71, "" + g[t + 2])), (s += 1) > tb.arraylengthget(_Grid) && (s = 1, a += 1)
        }
        for (a = 2; a <= tb.arrayheightget(_Grid) - 2; a++)
            for (s = 2; s <= tb.arraylengthget(_Grid) - 2; s++) null == (n = _Grid[s][a]) && tb.notificationcancel(0), n.Kind == _Lock && (n.Transparency = .5, (new _Create_Pen).Lock_tile = n), n.Kind == _Lock && (n.Transparency = .5), n.Kind == _Zoohouse && (n.Add_X = 2, n.Add_Y = 1), n.Kind == _Zoo_tree && (n.Angle = 45, _Grid[s][a - 1].Kind == n.Kind ? (n.Angle = 315, _Grid[s - 1][a - 0].Kind == n.Kind && (n.Angle = 0, n.Add_X = -.3, n.Add_Y = -.3), _Grid[s + 1][a - 0].Kind == n.Kind && (n.Angle = 90, n.Add_X = .3, n.Add_Y = -.3)) : _Grid[s - 0][a + 1].Kind == n.Kind && (n.Angle = 315, _Grid[s - 1][a - 0].Kind == n.Kind && (n.Angle = 90, n.Add_X = -.3, n.Add_Y = .3), _Grid[s + 1][a - 0].Kind == n.Kind && (n.Angle = 0, n.Add_X = .3, n.Add_Y = .3)), _Is_Mac && (n.Angle -= 2))
    }

    function _Setup_tilekinds() {
        var t = null;
        (t = new _Create_Tile_kind_class).Letter = "g", t.Emoji = "", t.walkable = !0, t.Size = 1, _Grass = t, (t = new _Create_Tile_kind_class).Letter = "t", t.Emoji = "🌲", t.Emoji_size = 1.3, _Tree = t, (t = new _Create_Tile_kind_class).Letter = "p", t.Emoji = "🔗", t.Emoji_size = .8, _Zoo_tree = t, (t = new _Create_Tile_kind_class).Letter = "o", t.Emoji = "🌊", t.color = {
            r: 0,
            g: 134,
            b: 244,
            a: 255
        }, t.Size = 1, _Ocean = t, (t = new _Create_Tile_kind_class).Letter = "w", t.Emoji = "🌾", t.color = {
            r: 204,
            g: 178,
            b: 0,
            a: 255
        }, t.walkable = !0, t.Pickable = !0, t.Emoji_size = .6, t.Size = 1, _Grain = t, (t = new _Create_Tile_kind_class).Letter = "f", t.Emoji = "🌼", t.walkable = !0, t.Pickable = !0, t.Emoji_size = .3, t.Size = 1, _Flower = t, (t = new _Create_Tile_kind_class).Letter = "m", t.Emoji = String.fromCharCode(9968), t.Emoji_size = 1.4, t.Size = 1, _Mountain = t, (t = new _Create_Tile_kind_class).Letter = "z", t.Emoji = "🏚️", t.Emoji_size = 4.4, t.Size = 4, _Zoohouse = t, (t = new _Create_Tile_kind_class).Letter = "s", t.Emoji = "🌱", t.walkable = !0, t.Pickable = !0, t.Emoji_size = .4, t.Size = .4, _Seedling = t, (t = new _Create_Tile_kind_class).Letter = "r", t.Emoji = "🌷", t.walkable = !0, t.Pickable = !0, t.Emoji_size = .4, t.Size = .4, _Rose = t, (t = new _Create_Tile_kind_class).Letter = "W", t.Emoji = "💨", t.walkable = !0, t.Emoji_size = 1, t.Size = 1, _Wind = t, (t = new _Create_Tile_kind_class).Letter = "S", t.Emoji = "🚧", t.walkable = !0, t.Emoji_size = .7, t.Size = .7, _Sign_Post = t, (t = new _Create_Tile_kind_class).Letter = "l", t.Emoji = "🔒", t.walkable = !0, t.Emoji_size = .7, t.Size = .7, _Lock = t, (t = new _Create_Tile_kind_class).Letter = "i", t.Emoji = "", t.Size = 1, _Invisible_wall = t
    }

    function _Tap_to_dismount() {
        var t = null;
        if (null != _You.Guy_it_is_riding && (tb.mouseclickedany && _Tapping_on_dismount_area(tb.touchx, tb.touchy) || tb.keyreleased[32])) {
            for (_You.X = _You.Guy_it_is_riding.X, _You.Y = _You.Guy_it_is_riding.Y, _You.Guy_it_is_riding.Guy_riding_it = null, (t = _You.Guy_it_is_riding).Scared_amount = -500, _You.Guy_it_is_riding = null, gvar = 1; gvar <= 6; gvar++) _You._Go(1, 1), t._Go(-1, -1);
            t._Pen_update()
        }
    }

    function _Tap_to_pick_up_item() {
        var t = null,
            e = null;
        (tb.mouseclickedany && _Tapping_on_dismount_area(tb.touchx, tb.touchy) || tb.keyreleased[32]) && (e = _Tile_get(Math.floor(_You.X + .5), Math.floor(_You.Y + .7)), null == _You.Tile_kind_holding ? e.Kind.Pickable && (_You.Tile_kind_holding = e.Kind, e.Kind = _Grass, tb.debugset("Pickup item" + _You.Tile_kind_holding.Emoji)) : e.Kind == _Grass ? (tb.debugset("Drop item" + _You.Tile_kind_holding.Emoji), e.Kind = _You.Tile_kind_holding, _You.Tile_kind_holding = null) : e.Kind.Pickable && (tb.debugset("Swap item with" + e.Kind.Emoji), t = _You.Tile_kind_holding, _You.Tile_kind_holding = e.Kind, e.Kind = t))
    }

    function _Tapping_on_dismount_area(t, e) {
        var g;
        return g = .8 * _Tile_size, !!tb.rectshit(t, e, 1, 1, tb.screensizex / 2 - g, tb.screensizey / 2 - g, 2 * g, 2 * g)
    }

    function _Tile_get(t, e) {
        return tb.rectshit(t, e, 0, 0, 0, 0, tb.arraylengthget(_Grid), tb.arrayheightget(_Grid)) ? _Grid[t][e] : null
    }

    function _When_App_Loaded() {
        "iP" != tb.stringpart(tb.devicename, 1, 2, 0) && "Ma" != tb.stringpart(tb.devicename, 1, 2, 0) || (_Is_Mac = !0), tb.fontset("Segoe UI Emoji"), _Setup_tilekinds(), _Setup_guy_kinds(), _Resized(), _Setup_guys()
    }

    function _Create_Guy_class() {
        return this.Bob = 0, this.Facing_right = !1, this.Frame = 0, this.Go_amount = 0, this.Go_angle = 0, this.Guy_it_is_riding = null, this.Guy_riding_it = null, this.Kind = null, this.Penned = !1, this.Scared_amount = 0, this.Size = 0, this.Speed = 0, this.Speed_x = 0, this.Speed_y = 0, this.Tile_kind_holding = null, this.X = 0, this.Y = 0, tb.listpush(0, _Guys_list, this), this.Size = .5, null
    }

    function _Create_Guy_kind_class() {
        return this.Emoji = "", this.Emoji_frame_2 = "", this.Emojisize = 0, this.Name = "", this.Speed = 0, this.Unrideable = !1, this.Emojisize = 1, null
    }

    function _Create_Tile_class() {
        return this.Add_X = 0, this.Add_Y = 0, this.Angle = 0, this.Kind = null, this.Locked = !1, this.Transparency = 0, this.X = 0, this.Y = 0, null
    }

    function _Create_Tile_kind_class() {
        return this.color = {
            r: 0,
            g: 0,
            b: 0,
            a: 255
        }, this.Emoji = "", this.Emoji_size = 0, this.Image = null, this.Letter = "", this.Pickable = !1, this.Size = 0, this.walkable = !1, this.Emoji_size = 1, tb.listpush(1, _All_tile_kinds, this), null
    }

    function _Create_Pen() {
        return this.Animal_in_it = null, this.Kind_its_for = null, this.Lock_tile = null, tb.listpush(0, _All_pens, this), 1 == _All_pens.total && (this.Kind_its_for = _Horse), 2 == _All_pens.total && (this.Kind_its_for = _Octopus), 3 == _All_pens.total && (this.Kind_its_for = _Pig), 4 == _All_pens.total && (this.Kind_its_for = _Sheep), null
    }

    function tbmake() {
        Math.sign || (Math.sign = function(t) {
            return (t > 0) - (t < 0) || +t
        });
        var t = console.log.bind(console);
        window.location.host;
        var e = localStorage;
        e || (e = {});
        var g = 2147483648,
            i = 0;
        tb.canvassaves = 0, tb.glis = 0, tb.touchx = 0, tb.touchy = 0, tb.mousedownmouse = 0, tb.mouses = {}, tb.resized = !1, tb.now = 0;
        var n = 0,
            o = 0,
            s = 1e3 / 60,
            a = 0;
        tb.fps = 0, tb.loops = 0, tb.running = 0;
        var r = 0,
            m = [];
        tb.keydown = [], tb.keyhit = [], tb.keyreleased = [], tb.mousedowntime = 0, tb.mousehitany = 0, tb.mousedownany = 0, tb.mousereleasedany = 0, tb.mouseclickedany = 0, tb.mousewheelspeed = 0;
        var l = 22;
        tb.font = "arial", tb.scalex = 1, tb.scaley = 1, tb.offsetx = 0, tb.offsety = 0, tb.color = {
            r: 255,
            g: 255,
            b: 255,
            a: 255
        }, tb.transparency = 0, tb.imagesmoothing = !1;
        var _, d, u = [];
        tb.images = [], tb.sounds = [], tb.devicename = "device", tb.rootpath = "";
        var c, b, f = 4294967040,
            h = Math.PI / 180;
        tb.degreestoradians = h, tb.audiocontext = null;
        var p = window.AudioContext || window.webkitAudioContext || !1;
        try {
            tb.audiocontext = new p
        } catch (e) {
            t(e)
        }
        var v = function(t) {
            var e = tb.mouses[t];
            return e || ((e = {}).index = t, e.x = 0, e.y = 0, e.speedx = 0, e.speedy = 0, e.down = 0, e.downx = 0, e.downy = 0, e.movedsincedown = 0, tb.mouses[t] = e, e)
        };
        tb.mousereal = v("real"), tb.setup = function() {
            tb.offsettransformedx = 0, tb.offsettransformedy = 0, tb.mobile = 0;
            var e = navigator.userAgent;
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e) ? (tb.mobile = 1, (e = e.toLowerCase()).indexOf("android") >= 0 ? tb.devicename = "Android" : e.indexOf("iphone") >= 0 ? tb.devicename = "iPhone" : e.indexOf("ipad") >= 0 ? tb.devicename = "iPad" : e.indexOf("ipod") >= 0 && (tb.devicename = "iPod")) : (tb.devicename = "Windows computer", "Mac" == navigator.platform.substr(0, 3) && (tb.devicename = "Mac computer"));
            var g = document.createElement("div");
            g.innerHTML = "\t\t\t<input type='password' id=gbginput spellcheck='false' autocomplete='off' style='position:absolute;top:40px;left:0;width:1px;height:1px;font-size:1px' />\t\t\t<canvas width='0' height='0' id='gglcanvas' style='position:absolute;top:0;left:0'></canvas>\t\t\t<canvas width='0' height='0' id='gcanvas' style='position:relative;top:0;left:0'></canvas>\t\t\t<canvas width='0' height='0' id='gtex' style='display:none;position:absolute;top:0;left:0'></canvas>\t\t", window.galldiv = document.getElementById("galldiv"), galldiv.appendChild(g), window.gcanvas = document.getElementById("gcanvas"), d = gcanvas, _ = d.getContext("2d"), window.gdraw = _, tb.imagesmoothingset(!1), tb.mobile ? (c = A(tb.rootpath + "/nothing.wav"), galldiv.onclick = K) : b = 1;
            var i = function(t) {
                var e;
                e = t.detail ? -120 * t.detail : t.wheelDelta, tb.mousewheelspeed = e
            };
            window.addEventListener("mousemove", x.bind(tb)), window.addEventListener("mousedown", z.bind(tb)), window.addEventListener("mouseup", G.bind(tb)), window.addEventListener("keydown", Y.bind(tb)), window.addEventListener("keyup", S.bind(tb)), window.addEventListener("resize", y.bind(tb)), window.addEventListener("blur", tb.inputclear.bind(tb)), document.addEventListener("DOMMouseScroll", function(t) {
                i(t)
            }), window.addEventListener("mousewheel", function(t) {
                i(t)
            }), document.addEventListener("touchstart", function(e) {
                t("touchstart", e.changedTouches);
                for (var g = 0; g < e.changedTouches.length; g++) {
                    var i = e.changedTouches[g],
                        n = v(i.identifier);
                    n.x = i.clientX, n.y = i.clientY, tb.mousereal.x = n.x, tb.mousereal.y = n.y, n.down = 1, M(e, n)
                }
                return !w(e) || (e.preventDefault(), !1)
            }, {
                passive: !1
            }), document.addEventListener("touchend", function(e) {
                t("touchend", e.changedTouches);
                for (var g = 0; g < e.changedTouches.length; g++) {
                    var i = e.changedTouches[g],
                        n = v(i.identifier);
                    n.x = i.clientX, n.y = i.clientY, tb.mousereal.x = n.x, tb.mousereal.y = n.y, E(e, n)
                }
                return !w(e) || (e.preventDefault(), !1)
            }, {
                passive: !1
            }), document.addEventListener("touchcancel", function(e) {
                t("touchcancel", e.changedTouches);
                for (var g = 0; g < e.changedTouches.length; g++) {
                    var i = e.changedTouches[g],
                        n = v(i.identifier);
                    n.x = i.clientX, n.y = i.clientY, tb.mousereal.x = n.x, tb.mousereal.y = n.y, E(e, n)
                }
                return e.preventDefault(), !1
            }, {
                passive: !1
            }), document.addEventListener("touchmove", function(e) {
                t("touchmove", e.changedTouches);
                for (var g = 0; g < e.changedTouches.length; g++) {
                    var i = e.changedTouches[g],
                        n = v(i.identifier),
                        o = n.x,
                        s = n.y;
                    if (n.x = i.clientX, n.y = i.clientY, n.down, tb.mousereal.x = n.x, tb.mousereal.y = n.y, k(n, o, s), C(n), tb.clickmovedcallback && 0 == tb.clickmovedcallback(e, n)) return e.preventDefault(), !1;
                    if (tb.running) return e.preventDefault(), !1
                }
            }, {
                passive: !1
            }), document.addEventListener("visibilitychange", function() {
                if (t("visibilitychange() hidden=", document.hidden), tb.running)
                    for (var e, g = -1; e = tb.sounds[++g];) document.hidden ? (e.loopstoppedminimize = 0, e.looping && (e.loopstoppedminimize = 1), tb.soundstop(e)) : e.loopstoppedminimize && (e.loopstoppedminimize = 0, tb.soundloop(e))
            }, !1), tb.running = 1, tb.rngsetup((new Date).getTime()), _.textAlign = "left", _.textBaseline = "top", U(), y()
        }, tb.fpsset = function(t) {
            t > 0 || (t = 1), s = 1e3 / t, tb.fpstimewanted = s
        }, tb.updateshould = function() {
            tb.now = (new Date).getTime();
            var t = tb.now - a;
            return tb.elapsed = t, t < s - 1 ? 0 : (a = tb.now - t % s, 1)
        }, tb.update = function() {
            for (var t in o++, tb.now > n && (n = tb.now + 1e3, tb.fps = o, o = 0), tb.loops++, tb.resized = !1, tb.mouses) {
                var e = tb.mouses[t];
                e.speedx = 0, e.speedy = 0
            }
            r = 0, m = [], tb.keyhit = [], tb.keyreleased = [], tb.mousehitany = 0, tb.mousereleasedany = 0, tb.mouseclickedany = 0, tb.mousewheelspeed = 0
        };
        var w = function(t) {
            if (tb.running && b && !r) return 1
        };
        tb.canvasreset = function() {
            u = [], Z(), _.textAlign = "left", _.textBaseline = "top"
        };
        var y = function(t) {
                tb.screensizex = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), tb.screensizey = Math.max(document.documentElement.clientHeight, window.innerHeight || 0), gcanvas.setAttribute("width", tb.screensizex), gcanvas.setAttribute("height", tb.screensizey), gcanvas.style.width = tb.screensizex + "px", gcanvas.style.height = tb.screensizey + "px", tb.glis && (gglcanvas.setAttribute("width", tb.screensizex), gglcanvas.setAttribute("height", tb.screensizey), gglcanvas.style.width = tb.screensizex + "px", gglcanvas.style.height = tb.screensizey + "px"), R(), _.textAlign = "left", _.textBaseline = "top", U(), tb.running && window.scrollTo(0, 0), tb.resized = !0
            },
            z = function(t) {
                if (T(t), tb.mousereal.x = t.clientX, tb.mousereal.y = t.clientY, tb.mousereal.down = 1, M(t, tb.mousereal), !w(t)) return !0;
                t.preventDefault()
            },
            x = function(t) {
                var e = tb.mousereal,
                    g = e.x,
                    i = e.y;
                if (e.x = t.clientX, e.y = t.clientY, k(e, g, i), tb.mouseoverdiv = t.target, e.down && (C(e), tb.clickmovedcallback && 0 == tb.clickmovedcallback(t, e))) return t.preventDefault(), !1
            },
            k = function(e, g, i) {
                e != tb.mousereal && (tb.mouseoverdiv = document.elementFromPoint(e.x, e.y), t("mouseoverdiv=" + (tb.mouseoverdiv && tb.mouseoverdiv.id))), g > -1 && (e.speedx = e.x - g, e.speedy = e.y - i), tb.mousemovedcallback && tb.mousemovedcallback(e)
            },
            T = function(t) {
                tb.keydown[16] && !t.shiftKey && (tb.keydown[16] = 0, tb.keyreleased[16] = 1), tb.keydown[17] && !t.ctrlKey && (tb.keydown[17] = 0, tb.keyreleased[17] = 1)
            },
            G = function(t) {
                T(t), E(t, tb.mousereal)
            },
            S = function(t) {
                tb.keydown[t.keyCode] = 0, tb.keyreleased[t.keyCode] = 1
            },
            Y = function(e) {
                t(e), tb.keydown[e.keyCode] || (tb.keydown[e.keyCode] = 1, tb.keyhit[e.keyCode] = 1);
                var g = e.keyCode;
                if (m.push(g), t("keydown", g, String.fromCharCode(g), m), 9 == g) return e.preventDefault(), !1
            };
        tb.inkey = function() {
            var t = m.shift();
            return t || null
        };
        var C = function(t) {
                if (t.down) {
                    var e = t.x,
                        g = t.y;
                    tb.touchx = e, tb.touchy = g;
                    (Math.abs(t.downx - e) > 6 || Math.abs(t.downy - g) > 6) && (t.movedsincedown = 1)
                }
            },
            M = function(e, g) {
                t("tb _clickstarted()"), tb.mousehitany = 1, tb.mousedownany = 1, tb.touchx = g.x, tb.touchy = g.y, g.downx = g.x, g.downy = g.y, tb.mousedownmouse = g, tb.mousedowntime = tb.now, g.movedsincedown = 0, tb.mouseoverdiv = e.target
            },
            E = function(e, g) {
                for (var i in t("clickended()", g), g.down = 0, tb.mousereleasedany = 1, tb.mousedownany = 0, tb.mouses)
                    if (tb.mouses[i].down) {
                        tb.mousedownany = 1;
                        break
                    } if (!g.movedsincedown && (tb.mouseclickedany = 1, tb.clickedcallback && !tb.clickedcallback(e, g))) return e.preventDefault(), !1;
                g != tb.mousereal && delete tb.mouses[g.index]
            };
        tb.soundvolumeset = function(t, e) {
            if (!t) return 0;
            if (e < 0) throw "Volume cannot be negative: " + e;
            if (e > 1) throw "Volume must be between 0 and 1. Was " + e;
            t.volume = e, t.audio && t.audio.play ? t.audio.volume = e : t.gainnode && (t.gainnode.gain.value = e)
        }, tb.soundplay = function(e, g, i) {
            if (!e) throw "Play Sound: Sound is Null";
            var n = e.audio;
            if (!n) return 0;
            if (!e.loaded) {
                if (!(n.readyState > 3)) return 0;
                e.loaded = 1
            }
            if (t("soundplay", e, g, i), n.play) {
                n.pause(), n.currentTime = 0, n.volume = e.volume;
                var o = n.play();
                o && o.catch && o.catch(function(t) {
                    console.log("soundplay", t)
                })
            } else if (tb.audiocontext) {
                var s = tb.audiocontext.createBufferSource();
                if (s && (s.buffer = n, s.start || (s.start = s.noteOn), s.start)) {
                    var a = tb.audiocontext.createGain();
                    s.connect(a), a.connect(tb.audiocontext.destination), a.gain.value = e.volume, i || g ? i ? s.start(0, g || 0, i) : s.start(0, g || 0) : s.start(), e.gainnode = a, e.playedtime = tb.now
                }
            }
        }, tb.gethacksound = function() {
            return c
        }, tb.gethacksoundplayed = function() {
            return b
        };
        var K = function() {
            !b && c && (tb.audiocontext.resume && tb.audiocontext.resume(), tb.soundplay(c), c.loaded && (b = 1, galldiv.removeAttribute("onclick"), galldiv.onclick = function() {}))
        };
        tb.soundloop = function(t) {
            return t && t.audio ? (tb.soundstop(t), t.looping = 1, t.loopstopped = 0, tb.soundplay(t), void(t.timeout = setTimeout(function() {
                t.loopstopped || tb.soundloop(t)
            }, 1e3 * t.audio.duration))) : 0
        }, tb.soundstop = function(t) {
            if (!t.loaded) return 0;
            var e = t.audio;
            if (!e) return 0;
            t.looping = 0, t.loopstopped = 1, t.timeout && (clearTimeout(t.timeout), t.timeout = 0), e.play ? (e.pause(), e.currentTime = 0) : (t.gainnode && (t.gainnode.gain.value = 0), t.playedtime = 0)
        }, tb.soundplaying = function(t) {
            var e = t.audio;
            return e ? e.play ? !e.paused : t.playedtime ? tb.now - t.playedtime < 1e3 * e.duration : 0 : 0
        };
        var A = function(t) {
            var e = {
                volume: 1,
                loaded: 0,
                playedtime: 0
            };
            return e.audio = document.createElement("audio"), e.audio.addEventListener("canplaythrough", function() {
                e.loaded = 1
            }, !1), e.audio.src = t, e
        };
        tb.soundloadonline = function(t) {
            if ("http" != t.substr(0, 4)) throw 'Sound URL should start with "http" Instead found "' + t + '"';
            return A(t)
        }, tb.soundadd = function(t) {
            var e = {
                volume: 1,
                version: 1,
                loaded: 0,
                playedtime: 0
            };
            if (t && t.substr) {
                "/" == t[0] && (t = tb.rootpath ? tb.rootpath + t : t.substr(1));
                e.url = t, L(t, function(t) {
                    e.loaded = 1, e.audio = t
                })
            } else e.audio = t, e.loaded = 1;
            return tb.sounds.push(e), e
        };
        var L = function(t, e) {
                if (!tb.audiocontext) return 0;
                var g = new XMLHttpRequest;
                return g.open("GET", t, !0), g.responseType = "arraybuffer", g.onload = function() {
                    tb.audiocontext.decodeAudioData(g.response, function(t) {
                        e && e(t)
                    }, function(t) {})
                }, g.onerror = function() {}, g.send(), g
            },
            I = function(t) {
                var e = {};
                return e.val = t, e.next = null, e.prev = null, e
            },
            j = function(t, e) {
                for (var g = t.first;;) {
                    if (!g) return;
                    if (g.val == e) return g;
                    g = g.next
                }
            },
            P = function(t, e) {
                return e.prev ? e.prev.next = e.next : t.first = e.next, e.next ? e.next.prev = e.prev : t.last = e.prev, t.total--, e.prev = null, e
            },
            X = function(t, e, g, i) {
                if (t.total++, i) {
                    if (!g && !(g = t.first)) return t.first = e, void(t.last = e);
                    g.prev ? g.prev.next = e : t.first = e, e.prev = g.prev, e.next = g, g.prev = e
                } else {
                    if (!g && !(g = t.last)) return t.first = e, void(t.last = e);
                    g.next ? g.next.prev = e : t.last = e, e.prev = g, e.next = g.next, g.next = e
                }
            };
        tb.listpush = function(t, e, g) {
            if (e) {
                var i = I(g);
                X(e, i, e.last)
            } else B(t, "Push: List is null.")
        }, tb.listfirstget = function(t, e) {
            if (e) {
                var g = e.first;
                return g ? g.val : null
            }
            B(t, "First Item: List is null.")
        }, tb.listlastget = function(t, e) {
            if (e) {
                var g = e.last;
                return g ? g.val : null
            }
            B(t, "Last Item: List is null.")
        }, tb.listpop = function(t, e) {
            if (e) {
                var g = e.last;
                return g ? (P(e, g), g.val) : null
            }
            B(t, "Pop: List is null.")
        }, tb.listpopfront = function(t, e) {
            if (e) {
                var g = e.first;
                return g ? (P(e, g), g.val) : null
            }
            B(t, "Pop Front: List is null.")
        }, tb.listinsert = function(t, e, g, i) {
            if (e)
                if (i < 1) B(t, "List Insert: Index cannot be less than 1. It was " + i);
                else {
                    var n = I(g);
                    if (i > e.total) X(e, n, e.last);
                    else {
                        for (var o = e.first; i > 1; i--) o = o.next;
                        X(e, n, o, 1)
                    }
                }
            else B(t, "List Insert: List is null.")
        }, tb.listitemget = function(t, e, g) {
            if (e) {
                if (g < 1) return B(t, "Get Item From List: Index cannot be less than 1. It was " + g), null;
                if (g > e.total) return null;
                for (var i = e.first; g > 1; g--) i = i.next;
                return i.val
            }
            B(t, "Get Item From List: List is null.")
        }, tb.listinsertbefore = function(t, e, g, i) {
            if (e) {
                var n = I(g),
                    o = j(e, i);
                o ? X(e, n, o, 1) : B(t, "Insert Before: Item is not in the list.")
            } else B(t, "Insert Before: List is null.")
        }, tb.listinsertafter = function(t, e, g, i) {
            if (e) {
                var n = I(g),
                    o = j(e, i);
                o ? X(e, n, o) : B(t, "Insert After: Item is not in the list.")
            } else B(t, "Insert After: List is null.")
        }, tb.listremove = function(t, e, g) {
            if (e) {
                var i = j(e, g);
                i ? P(e, i) : B(t, "List Remove: item was not in the list.")
            } else B(t, "Remove From List: List is null.")
        }, tb.textdraw = function(t, e, g) {
            _.fillText(t, e, g)
        }, tb.textdrawrotated = function(t, e, g, i) {
            _.save(), tb.canvassaves++, _.translate(e, g), _.rotate(i * h), _.textAlign = "center", _.textBaseline = "middle", _.fillText(t, 0, 0), _.restore(), tb.canvassaves--
        }, tb.textdrawcentered = function(t, e, g) {
            _.textAlign = "center", _.textBaseline = "middle", _.fillText(t, e, g), _.textAlign = "left", _.textBaseline = "top"
        }, tb.stringpart = function(t, e, g, i) {
            return t.substr(e - 1, g)
        }, tb.browseropen = function(t) {
            window.open(t)
        }, tb.imagedraw = function(t, e, g) {
            return t ? t.canvas ? void(void 0 !== t.angle ? F(t, e, g) : _.drawImage(t.canvas, e - t.offsetx, g - t.offsety)) : (B(void 0, "Draw Image: Image canvas is not set."), 0) : (B(void 0, "Draw Image: Image value is not set."), 0)
        }, tb.imagedrawgl = function(t, e, g, i, n) {
            if (!t) return B(void 0, "Draw Image: Image value is not set."), 0;
            void 0 !== i ? tb.imagedrawatsize(t, e, g, i, n) : tb.imagedraw(t, e, g)
        }, tb.imageoffsetset = function(t, e, g) {
            t.offsetx = e, t.offsety = g
        };
        var F = function(t, e, g) {
                _.save(), tb.canvassaves++, _.translate(e, g), _.rotate(t.angle), _.drawImage(t.canvas, -t.offsetx, -t.offsety), _.restore(), tb.canvassaves--
            },
            W = function(t, e, g, i, n) {
                _.save(), tb.canvassaves++, _.translate(e, g), _.rotate(t.angle);
                var o = 1,
                    s = 1;
                i < 0 && (o = -1), n < 0 && (s = -1), _.scale(o, s), _.drawImage(t.canvas, -t.offsetx * i / t.canvas.width * o, -t.offsety * n / t.canvas.height * s, Math.abs(i), Math.abs(n)), _.scale(o, s), _.restore(), tb.canvassaves--
            };
        tb.imagedrawatsize = function(t, e, g, i, n) {
            if (i < 0 || n < 0)
                if (void 0 !== t.angle) W(t, e, g, i, n);
                else {
                    var o = 1,
                        s = 1;
                    i < 0 && (o = -1), n < 0 && (s = -1), _.scale(o, s), _.drawImage(t.canvas, e * o - t.offsetx, g * s - t.offsety, Math.abs(i), Math.abs(n)), _.scale(o, s)
                }
            else void 0 !== t.angle ? W(t, e, g, i, n) : _.drawImage(t.canvas, e - t.offsetx, g - t.offsety, i, n)
        }, tb.imagesizexget = function(t) {
            return t ? t.glis ? t.sizex : t.loaded ? t.canvas ? t.canvas.width : (B(void 0, "Image Width: Image canvas is not set."), 0) : 0 : 64
        }, tb.imagesizeyget = function(t) {
            return t ? tb.glis ? t.sizey : t.loaded ? t.canvas ? t.canvas.height : (B(void 0, "Image Height: Image canvas is not set."), 0) : 0 : 64
        }, tb.imageadd = function(t) {
            "/" == t[0] && (t = tb.rootpath ? tb.rootpath + t : t.substr(1));
            var e = {};
            e.canvas = new Image, e.offsetx = 0, e.offsety = 0, e.canvas.onload = function() {
                e.loaded = 1
            }, e.canvas.src = t, tb.images.push(e)
        }, tb.imageaddviacanvas = function(t) {
            var e = t.getContext("2d");
            e.textAlign = "left", e.textBaseline = "top";
            var g = {};
            return g.canvas = t, g.offsetx = 0, g.offsety = 0, g.loaded = 1, tb.images.push(g), g
        }, tb.assetsallloaded = function() {
            for (var t, e = -1; t = tb.images[++e];)
                if (!t.glis && !t.loaded) return 0;
            var g;
            for (e = -1; g = tb.sounds[++e];)
                if (!g.loaded) return 0;
            return 1
        }, tb.mod = function(t, e) {
            return t > 0 ? t % e : e > 0 ? t - e * Math.floor(t / e) : 0 == e ? t : t % e
        }, tb.rngsetup = function(t) {
            (!t || t < 0) && (t = 0), i = t || Math.floor(Math.random() * (g - 1))
        };
        var D = function() {
            return i = (1103515245 * i + 12345) % g
        };
        tb.random = function() {
            return D() / (g - 1)
        }, tb.randomint = function(t, e) {
            if (t = Math.floor(t), (e = Math.floor(e)) <= t) return t;
            var i = e + 1 - t,
                n = D() / g;
            return t + Math.floor(n * i)
        }, tb.angleto = function(t, e, g, i) {
            var n = Math.atan2(i - e, g - t) / h;
            return n < 0 && (n += 360), n
        }, tb.clamp = function(t, e, g) {
            if (e > g) throw "Clamp: From cannot be greater than To.";
            return t < e ? e : t > g ? g : t
        }, tb.arraylengthget = function(t) {
            if (!t) throw "Array Length: Array is null.";
            return t.length - 1
        }, tb.arrayheightget = function(t) {
            if (!t) throw "Array Height: Array is null.";
            return t.length ? t[1].length - 1 : 0
        }, tb.arraymake = function(t, e, g, i, n) {
            g < 1 && B(t, "Array length can't be less than 1. It was " + g);
            var o = [];
            if (void 0 === i)
                for (var s = 1; s <= g; s++) o[s] = e;
            else if (void 0 === n) {
                i < 1 && B(t, "Array height can't be less than 1. It was " + i);
                for (s = 1; s <= g; s++) {
                    o[s] = [];
                    for (var a = 1; a <= i; a++) o[s][a] = e
                }
            } else {
                n < 1 && B(t, "Array depth can't be less than 1. It was " + n);
                for (s = 1; s <= g; s++) {
                    o[s] = [];
                    for (a = 1; a <= i; a++) {
                        o[s][a] = [];
                        for (var r = 1; r <= n; r++) o[s][a][r] = e
                    }
                }
            }
            return o
        }, tb.debugset = function(t) {
            console.log(t), window.gdebugtextdiv && (gdebugtextdiv.innerHTML = t)
        };
        var B = function() {};
        tb.fontsizeset = function(t) {
            l = t, _.font = l + "px " + tb.font
        }, tb.fontset = function(t) {
            tb.font = t, _.font = l + "px " + tb.font
        }, tb.rectdraw = function(t, e, g, i) {
            _.fillRect(t, e, g, i)
        }, tb.circledraw = function(t, e, g) {
            if (g < 0) return 0;
            _.beginPath(), _.arc(t, e, g, 0, 2 * Math.PI), _.fill()
        }, tb.offsetset = function(t, e) {
            tb.offsetx = t, tb.offsety = e, H("offset"), Z(), O()
        }, tb.scaleset = function(t, e) {
            tb.scalex = t, tb.scaley = e, H("scale"), Z(), O()
        };
        var O = function() {
                if (tb.glis)
                    for (var t = tb.offsetx, e = tb.offsety, g = 0; g < u.length; g++) {
                        var i = u[g];
                        if ("scale" == i) t *= tb.scalex, e *= tb.scaley;
                        else if ("offset" == i) return tb.offsettransformedx = t, void(tb.offsettransformedy = e)
                    }
            },
            H = function(t) {
                var e = u.indexOf(t);
                e >= 0 && u.splice(e, 1), u.push(t)
            },
            R = function() {
                _.restore(), tb.canvassaves--
            },
            Z = function() {
                R(), U()
            },
            U = function() {
                _.save(), tb.canvassaves++;
                for (var t = 0; t < u.length; t++) {
                    var e = u[t];
                    "scale" == e ? _.scale(tb.scalex, tb.scaley) : "offset" == e && _.translate(tb.offsetx, tb.offsety)
                }
                tb.fontset(tb.font), tb.colorset(tb.color), tb.imagesmoothingset(tb.imagesmoothing), tb.transparencyset(tb.transparency)
            },
            N = function(t) {
                var e = tb.canvasmake(t.canvas.width, t.canvas.height);
                e.getContext("2d").drawImage(t.canvas, 0, 0), t.canvas = e
            };
        tb.imagepixelsget = function(t) {
            return new Uint8Array(new ArrayBuffer(16385))
        }, tb.colormake = function(t, e, g) {
            if (t < 0 || t > 255) throw "RGB Color: Color must be from 0 to 255. Red was " + t;
            if (e < 0 || e > 255) throw "RGB Color: Color must be from 0 to 255. Green was " + e;
            if (g < 0 || g > 255) throw "RGB Color: Color must be from 0 to 255. Blue was " + g;
            return {
                r: Math.floor(t),
                g: Math.floor(e),
                b: Math.floor(g),
                a: 255
            }
        }, tb.colortostring = function(t) {
            return "rgba(" + t.r + "," + t.g + "," + t.b + "," + t.a + ")"
        }, tb.cls = function(t) {
            R(), _.fillStyle = tb.colortostring(t), _.fillRect(0, 0, tb.screensizex, tb.screensizey), U()
        }, tb.colorset = function(t) {
            tb.color = t, _.fillStyle = _.strokeStyle = tb.colortostring(t), tb.glis && (f = 16777216 * t.r + (t.g << 16) + (t.b << 8), tb.drawrgb = f)
        }, tb.colorredget = function(t) {
            return t.r
        }, tb.colorgreenget = function(t) {
            return t.g
        }, tb.colorblueget = function(t) {
            return t.b
        }, tb.transparencyset = function(t) {
            if (t < 0) throw "Transparency cannot be negative: " + t;
            if (t > 1) throw "Transparency must be between 0 and 1. Was " + t;
            _.globalAlpha = 1 - t, tb.transparency = t
        }, tb.imagemake = function(t, e) {
            var g = {
                url: "",
                version: 1,
                loaded: 1
            };
            return g.canvas = tb.canvasmake(t, e), g.offsetx = 0, g.offsety = 0, g
        }, tb.canvasmake = function(t, e) {
            var g = document.createElement("canvas");
            g.width = t, g.height = e;
            var i = g.getContext("2d");
            return i.imageSmoothingEnabled = !1, i.fillStyle = "#FFF", i.strokeStyle = "#FFF", i.textAlign = "left", i.textBaseline = "top", g
        }, tb.imageloaded = function(t) {
            return t.glis ? tb.ggl.ready : !!t.loaded
        }, tb.imagesmoothingset = function(t) {
            tb.imagesmoothing = _.mozImageSmoothingEnabled = _.webkitImageSmoothingEnabled = _.msImageSmoothingEnabled = _.imageSmoothingEnabled = t
        }, tb.drawtoscreen = function(t) {
            tb.drawtocanvas(t, gcanvas)
        }, tb.drawtocanvas = function(t, e) {
            if (!e) return B(void 0, "Draw To Image: Image value is not set."), 0;
            if (e == gcanvas) var g = gcanvas;
            else {
                if (!e.loaded) return B(t, "Draw To Image: Image has not finished loading yet."), 0;
                if (e.glis) return B(t, "Draw To Image: Cannot draw to images that are hardware accelerated. Resize it first or use Create Image."), 0;
                e.canvas.getContext || N(e);
                g = e.canvas
            }
            if (d == g) return 0;
            var i = (d = g).getContext("2d");
            _ ? (_ = i, tb.fontsizeset(l), tb.colorset(tb.color)) : _ = i
        }, tb.pointincircle = function(t, e, g, i, n) {
            var o = g - t,
                s = i - e;
            return o * o + s * s < n * n
        }, tb.rectshit = function(t, e, g, i, n, o, s, a) {
            return t >= n + s ? 0 : e >= o + a ? 0 : n >= t + g ? 0 : o >= e + i ? 0 : 1
        }, tb.inputclear = function() {
            tb.keydown = [], tb.mouses = {}, tb.mousereal = v("real"), tb.touchx = 0, tb.touchy = 0, tb.mousedownmouse = 0
        }
    }

    window.onload = function() {
    // function hello() {
        tb.rootpath = "", tb.setup(), _When_App_Loaded(), tb.clickedcallback = _On_Tap, gloop()
    }, _Create_Guy_class.prototype._Can_see_point = function(t, e) {
        var g, i, n, o = null,
            s = 0,
            a = 0;
        s = this.X, a = this.Y, g = tb.angleto(s, a, t, e), i = .1 * Math.cos(g * tb.degreestoradians), n = .1 * Math.sin(g * tb.degreestoradians);
        for (var r = 0; !tb.pointincircle(s, a, t, e, 1);) {
            if (r++ > 999999) throw {
                line: 6,
                message: "Infinite While Loop"
            };
            if (s += i, a += n, o = _Tile_get(Math.floor(s + .5), Math.floor(a + .5)), !this._Can_walk_through_tile(o)) return !1
        }
        return !0
    }, _Create_Guy_class.prototype._Can_walk_through_tile = function(t) {
        return !!(t.Kind.walkable || this.Kind == _Octopus && t.Kind == _Ocean) && (t.Kind != _Lock || this.Kind == _Woman || null != this.Guy_riding_it)
    }, _Create_Guy_class.prototype._Draw = function() {
        var t, e = 0,
            g = "";
        tb.offsetset((this.X - _Camera_x) * _Tile_size + tb.screensizex / 2, (this.Y - _Camera_y) * _Tile_size + tb.screensizey / 2), this.Facing_right && tb.scaleset(-1, 1), tb.fontsizeset(_Tile_size * this.Kind.Emojisize), g = this.Kind.Emoji, "" != this.Kind.Emoji_frame_2 && this.Frame >= 2 && (g = this.Kind.Emoji_frame_2), null != this.Guy_it_is_riding ? (e = 0 - (7 + 3 * Math.sin(this.Bob * tb.degreestoradians)), tb.textdrawrotated(g, 0, 1 * Math.sin(this.Bob * tb.degreestoradians), e)) : (e = 0 - (7 + 7 * Math.sin(this.Bob * tb.degreestoradians)), tb.textdrawrotated(g, 0, 0, e)), null != this.Guy_riding_it && tb.imagedrawgl(_You_image, 0, -.34 * _Tile_size - _Tile_size * _You.Kind.Emojisize * .05 - 0, _Tile_size, _Tile_size), null != this.Tile_kind_holding && (tb.fontsizeset(_Tile_size * this.Tile_kind_holding.Emoji_size * .8), tb.textdrawrotated(this.Tile_kind_holding.Emoji, -.2 * _Tile_size, 0, e)), tb.scaleset(1, 1), t = _Tile_get(Math.floor(this.X + .5), Math.floor(this.Y + .5)), null == this.Guy_it_is_riding && t.Kind == _Ocean && (tb.colorset(t.Kind.color), tb.transparencyset(.5), tb.circledraw(0, .2 * _Tile_size, .2 * _Tile_size, 0, 2 * Math.PI), tb.circledraw(.2 * _Tile_size, .2 * _Tile_size, .2 * _Tile_size, 0, 2 * Math.PI), tb.circledraw(-.2 * _Tile_size, .2 * _Tile_size, .2 * _Tile_size, 0, 2 * Math.PI), tb.transparencyset(0)), _Guy_who_is_talking == this && (tb.fontsizeset(4.5 * _Tile_size), tb.textdrawcentered("🗯", 2.1 * _Tile_size, -2.2 * _Tile_size), tb.colorset(tb.colormake(0, 0, 0, 255)), tb.fontsizeset(.3 * _Tile_size), this == _Zookeeper && (_All_penned() ? (tb.textdrawcentered("😄", 2.1 * _Tile_size, -3.3 * _Tile_size), tb.textdrawcentered("You did it!", 2.1 * _Tile_size, -2.9 * _Tile_size), tb.textdrawcentered("Game will be truly over when", 2.1 * _Tile_size, -2.5 * _Tile_size), tb.textdrawcentered("you do this in real life.", 2.1 * _Tile_size, -2.1 * _Tile_size)) : (tb.textdrawcentered("😟", 2.1 * _Tile_size, -3.3 * _Tile_size), tb.textdrawcentered("It's time we need to", 2.1 * _Tile_size, -2.9 * _Tile_size), tb.textdrawcentered("take action against humans", 2.1 * _Tile_size, -2.5 * _Tile_size), tb.textdrawcentered("have been tormenting us.", 2.1 * _Tile_size, -2.1 * _Tile_size))), this == _Farmer && (tb.textdrawcentered("🤠", 2.1 * _Tile_size, -3.3 * _Tile_size), tb.textdrawcentered("I'm the king.", 2.1 * _Tile_size, -2.9 * _Tile_size), tb.textdrawcentered("Bow before me", 2.1 * _Tile_size, -2.5 * _Tile_size), tb.textdrawcentered("till dawn.", 2.1 * _Tile_size, -2.1 * _Tile_size)))
    }, _Create_Guy_class.prototype._Go = function(t, e) {
        t > 0 && (this.Facing_right = !0), t < 0 && (this.Facing_right = !1), this.X += t * this.Speed, this._Hit_map() ? (this.X -= t * this.Speed, this.Speed_x = 0) : this.Speed_x = t * this.Speed, this.Y += e * this.Speed, this._Hit_map() ? (this.Y -= e * this.Speed, this.Speed_y = 0) : this.Speed_y = e * this.Speed, this.Bob += (Math.abs(t) + Math.abs(e)) * this.Speed * 333, null != this.Guy_riding_it && (this.Guy_riding_it.Bob += (Math.abs(t) + Math.abs(e)) * this.Speed * 333), this.Frame += (Math.abs(t) + Math.abs(e)) * this.Speed * 1.5, this.Frame >= 3 && (this.Frame = 1), null != this.Guy_riding_it && (this.Guy_riding_it.X = this.X, this.Guy_riding_it.Y = this.Y - .35, this.Guy_riding_it.Facing_right = this.Facing_right)
    }, _Create_Guy_class.prototype._Hit_guy = function() {
        for (var t = null, e = _Guys_list.first; e;) {
            if ((t = e.val) != this && this.Guy_it_is_riding != t && Math.pow(t.X - this.X, 2) + Math.pow(t.Y - this.Y, 2) < .35) return t;
            e = e.next
        }
        return null
    }, _Create_Guy_class.prototype._Hit_map = function() {
        var t, e, g, i, n = 0,
            o = 0,
            s = null;
        for (t = Math.floor(this.X + (1 - this.Size) / 2), e = Math.floor(this.X + (1 - this.Size / 2)), g = Math.floor(this.Y + (1 - this.Size) / 2), i = Math.floor(this.Y + (1 - this.Size / 2)), o = g; o <= i; o++)
            for (n = t; n <= e; n++) {
                if (null == (s = _Tile_get(n, o))) return !0;
                if (!this._Can_walk_through_tile(s)) return !0
            }
        return !1
    }, _Create_Guy_class.prototype._Pen_update = function() {
        for (var t = null, e = _All_pens.first; e;) {
            if ((null == (t = e.val).Animal_in_it || t.Animal_in_it == this) && tb.rectshit(this.X, this.Y, 0, 0, t.Lock_tile.X - 1.5, t.Lock_tile.Y - 5, 3, 5)) return void(t.Animal_in_it != this && (t.Animal_in_it = this, t.Lock_tile.Locked = !0, this.Penned = !0));
            e = e.next
        }
        if (this.Penned)
            for (var g = _All_pens.first; g;)(t = g.val).Animal_in_it == this && (t.Animal_in_it = null, t.Lock_tile.Locked = !1, this.Penned = !1), g = g.next
    }, _Create_Guy_class.prototype._Tile_get2 = function() {
        return _Tile_get(Math.floor(this.X + .5), Math.floor(this.Y + .5))
    }, _Create_Guy_class.prototype._Update = function() {
        var t, e = 0,
            g = !1,
            i = 0,
            n = 0,
            o = null,
            s = 0,
            a = 0,
            r = 0,
            m = 0;
        if (this == _You) tb.mousedownany && (_Tapping_on_dismount_area(_Touch_start_x, _Touch_start_y) || (e = tb.angleto(tb.screensizex / 2, tb.screensizey / 2, tb.touchx, tb.touchy), i = Math.cos(e * tb.degreestoradians), n = Math.sin(e * tb.degreestoradians))), e = 1, (tb.keydown[38] || tb.keydown[87]) && (e = 270), (tb.keydown[40] || tb.keydown[83]) && (e = 90), (tb.keydown[39] || tb.keydown[68]) && (e = 1 != e ? 90 == e ? 45 : 315 : 0), (tb.keydown[37] || tb.keydown[65]) && (e = 1 != e ? 90 == e ? 135 : 225 : 180), 1 != e && (i = Math.cos(e * tb.degreestoradians), n = Math.sin(e * tb.degreestoradians)), o = this._Hit_guy(), _Guy_who_is_talking = null, null != o && (null == this.Guy_it_is_riding && Math.abs(this.Speed_x) + Math.abs(this.Speed_y) < .16 && (o.Kind.Unrideable || (this.Guy_it_is_riding = o, o.Guy_riding_it = this, this.Frame = 1, o.Go_amount = 0, o.Scared_amount = 0)), o.Kind.Unrideable && (_Guy_who_is_talking = o));
        else if (this.Kind != _Man && null == this.Guy_riding_it) {
            if (s = 2.5, (g = !!tb.rectshit(this.X, this.Y, 1, 1, _You.X - s, _You.Y - s, 2 * s, 2 * s) && this._Can_see_point(_You.X, _You.Y)) || (this.Scared_amount > 0 && (this.Scared_amount -= .5), this.Scared_amount < 0 && (this.Scared_amount += .5)), g && this.Kind == _Horse && _You.Tile_kind_holding == _Grain) this.Go_angle = tb.angleto(this.X, this.Y, _You.X, _You.Y), this.Go_amount = 2;
            else {
                if (!this.Penned && (g && this.Scared_amount <= 0 || this.Go_amount <= 0 && this.Scared_amount > 0))
                    for (g && (this.Scared_amount += 1), m = 1; m <= 1 + tb.clamp(.2 * this.Scared_amount, 0, 100); m++) {
                        if (e = tb.angleto(_You.X, _You.Y, this.X, this.Y), e += (tb.random() - .5) * tb.clamp(5 * this.Scared_amount, 0, 300), s = 2 + 2 / m, a = this.X + Math.cos(e * tb.degreestoradians) * s, r = this.Y + Math.sin(e * tb.degreestoradians) * s, this._Can_see_point(a, r)) {
                            this.Go_angle = e, this.Go_amount = 33;
                            break
                        }
                        g && (this.Scared_amount += 3)
                    }
                this.Scared_amount <= 0 && tb.random() < .03 && (e = tb.randomint(1, 360), s = 2 * (tb.random() + 1), a = this.X + Math.cos(e * tb.degreestoradians) * s, r = this.Y + Math.sin(e * tb.degreestoradians) * s, this._Can_see_point(a, r) && (this.Go_angle = e, this.Go_amount = 66))
            }
            this.Go_amount > 0 && (this.Go_amount -= 1, i = Math.cos(this.Go_angle * tb.degreestoradians), n = Math.sin(this.Go_angle * tb.degreestoradians), this.Scared_amount <= 0 && (i *= .1, n *= .1))
        }
        this.Scared_amount <= 0 && this.Kind == _Pig && (n = 0), (t = this._Tile_get2()).Kind == _Wind && (tb.debugset("" + this.Y), tb.mod(this.Y + .5, 1) > .2 && (i = 1, n = .1)), this == _You && (_Tile_that_is_talking = null, t.Kind == _Sign_Post && (_Tile_that_is_talking = t)), this.Speed_x = 0, this.Speed_y = 0, null != this.Guy_it_is_riding ? this.Guy_it_is_riding._Go(i, n) : this._Go(i, n), this.Penned && null != this.Guy_riding_it && this._Pen_update()
    };
};

start_game();
