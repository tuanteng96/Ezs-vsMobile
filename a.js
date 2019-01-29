/*Các hàm bắt đầu với tiền tố g_(global)*/
function g_modal(a, b, c) {
    var o = {
        title: 'Thông báo',
        body: '',
        hidden: $.noop,
        shown: typeof a === 'function' ? a : typeof b === 'function' ? b : $.noop,
        buttons: [],
        size: '',
        oneshow: $.noop,
        oneshown: $.noop,
        onehidden: $.noop,

        hide_remove: true,
        name: 'modal-name',
        cls: "",
        centered: false,
        bodyHeight: '',
        iframe: 0,
        colorline: 0,
        zindex: null
    };
    var opt = typeof a === 'object' ? a : typeof b === 'object' ? b : typeof c === 'object' ? c : {};
    o = $.extend(o, opt);
    var name = typeof a === 'string' ? a : o.name || 'modal';
    var mody = '<div class="modal fade xmodal x1" tabindex="-1" role="dialog"> <div class="modal-dialog modal-' + o.size + (o.centered ? ' modal-dialog-centered' : '') + '" role="document"> <div class="modal-content"> ' + (o.colorline ? '<div class="color-line"></div>' : '') + ' <div class="modal-header"> <h5 class="modal-title">' + o.title + '</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div><div class="modal-body"> </div><div class="modal-footer"> </div></div></div></div>';
    var d = $('[data-modal="' + name + '"]');
    if (d.length === 0) {
        d = $(mody)
            .attr('data-modal', name)
            .addClass(o.cls);
        d.find('.modal-body')
            .html(o.body);
        if (o.buttons.length === 0) {
            d.find('.modal-footer').remove();
        }
        d.on('shown.bs.modal', o.shown).on('hidden.bs.modal', o.hidden);
        if (o.hide_remove) {
            d.on('hidden.bs.modal', function () {
                setTimeout(function () {
                    d.remove();
                }, 50);
            });
        }
        if (o.buttons) d.find('.modal-footer').html(o.buttons);
        if (o.zindex) {
            d.on('shown.bs.modal', function () {
                $('.modal-backdrop').css('z-index', o.zindex);
                $(this).css('z-index', o.zindex);
            });
        }
        d.one('shown.bs.modal', o.oneshown).one('show.bs.modal', o.oneshow).one('hidden.bs.modal', o.onehidden);
    }
    d.modal('show');
    return d;
}
function g_StringNotChars(strInput, from, charBreak) {
    var s = '';
    var i = from;
    var c;
    while (i < strInput.length) {
        c = strInput[i];
        if (charBreak.indexOf(c) > -1) break;
        s += c;
        i++;
    }
    return { value: s, index: i };
}
function g_$(strInput, html) {
    /*
     *strInput = tag.cls1.cls2#id[attrName1= valu1][attrName2= valu2](text)
     * */
    var tag = '';
    var id = null;
    var cls = null;
    var attr = null;
    var flag = 0;
    var i = 0;
    var c;
    var capture;
    while (i < strInput.length) {
        c = strInput[i];
        switch (c) {
            case '#':
                flag = 1;
                capture = g_StringNotChars(strInput, i + 1, '.[]');
                if (capture.value) id = capture.value;
                if (i !== capture.index) {
                    i = capture.index;
                    continue;
                }
                break;
            case '.':
                flag = 2;
                if (!cls) cls = [];
                capture = g_StringNotChars(strInput, i + 1, '.[]#');
                if (capture.value) cls.push(capture.value);
                if (i !== capture.index) {
                    i = capture.index;
                    continue;
                }
                break;

            case '[':
                flag = 3;
                if (!attr) attr = [];
                capture = g_StringNotChars(strInput, i + 1, ']');
                if (capture.value) attr.push(capture.value);
                if (i !== capture.index) {
                    i = capture.index + (strInput[capture.index] === ']' ? 1 : 0);//(bỏ qua ])
                    continue;
                }
                break;

            default:
                if (flag === 0)
                    tag += c;
                break;
        }
        i++;
    }
    tag = tag || 'div';
    var a = $('<' + tag + '/>');
    if (id) a.attr('id', id);
    if (cls) a.addClass(cls.join(' '));
    if (attr) {
        attr.forEach(function (at) {
            capture = g_StringNotChars(at, 0, '=');
            a.attr(capture.value, at.substr(capture.index + 1));
        });
    }
    if (html)
        a.html(html);
    return a;
}
function g_$_deep(strInput) {
    //string: "aa bb cc" => jQuery object ( aa(bb(cc)))
    var whitespace = '\x20|\t|\r|\n|\f';
    var arr = strInput.split(new RegExp(whitespace, 'gim'));
    var r = null;
    if (arr) arr.forEach(function (s) {
        if (!s) return;
        if (r === null)
            r = g_$(s);
        else {
            r.html(g_$(s));
            r = r.children().first();
        }
    });
    return d.html();

}
function g_$_array(strInput) {
    //string: "aa bb cc" => jQuery object Array [aa,bb,cc]
    var whitespace = '\x20|\t|\r|\n|\f';
    var arr = strInput.split(new RegExp(whitespace, 'gim'));
    var d = [];
    if (arr) arr.forEach(function (s) {
        if (!s) return;
        d.push(g_$(s));
    });
    return d;
}
function g_none(v) {
    return v === undefined || v === null;
}
function g_money(v) {
    return v ? v.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") : 0;
}
function g_datevn(v) {
    return 'Chưa xây dựng(g_datevn)';
}
function g_replace(strInput, obj) {
    //strInput: "..{{a}}... {{b.c}...{{d.e[1].f}}}" , obj= {a, b:{c}, d:[{f,},{f,}]}
    //sample str: "Đây là {{title}}. ID:{{id}}. Giá trị:{{value,g_money}}. Cấp con:{{ch[1].title}}. Cháu:{{ch[1].ch[0].title}}"
    //       obj: {title:"abc",id:425,value:1250000,ch:[{title:"ch1"},{title:"ch2", ch:[{title:"cấp cháu, con của ch2"}]}]}
    var s = '';
    var i = 0;
    var j = 0;
    if (!strInput) return s;
    var c;
    var d;
    var capture = '';
    var end = 0;
    var v;
    while (i < strInput.length) {
        c = strInput[i];
        d = strInput[i + 1];
        switch (c) {
            case '{':
                if (d === '{') {
                    capture = '';
                    end = 0;
                    j = i + 2;
                    v = null;
                    while (j < strInput.length) {

                        if (strInput[j] === '}' && strInput[j + 1] === '}') end = 1;
                        if (end) break;
                        capture += strInput[j];
                        j++;
                    }

                    if (end) {
                        var _arr = capture.split(/\,|\:/gim);
                        var arr = _arr[0].split('.');
                        i = j + 2;
                        arr.every(function (p, index) {
                            if (!v) v = obj;
                            //p: property or index
                            var segs = p.split(/\[|\]/gim);
                            v = v[segs[0]];
                            if (segs.length === 1) {
                                //nothing
                            } else {
                                //
                                var _i = parseInt(segs[1]);
                                if (Array.isArray(v)) {
                                    v = v[_i];
                                }
                            }

                            if (g_none(v) && index < arr.length) {
                                //không có giá trị
                                s += capture;
                                return false;
                            }
                            if (index === arr.length - 1) {
                                //end
                                if (_arr.length > 1) {
                                    //
                                    var fn = _arr[1];
                                    var params = [];
                                    for (var x = 2; x < _arr.length; x++) params.push(_arr[x]);

                                    if (window[fn]) {
                                        v = window[fn](v, params);
                                    } else v = null;
                                }
                                s += g_none(v) ? '' : v;
                            }
                            return true;
                        });
                        continue;
                    }
                }
                s += c;
                break;
            default:
                s += c;
                break;
        }
        i++;
    }
    return s;
}
function g_format(strInput, a, b) {
    /*
     ví dụ:
     var str = "Đây là {{0}}. Giá trị: {{2}}. ID:{{1}}"
     var rs = g_format(str,"abc",435, 12500000)
     */
    var s = '';
    var i = 0;
    var j = 0;
    if (!strInput) return s;
    var c;
    var d;
    var capture = '';
    var end = 0;
    var v;
    while (i < strInput.length) {
        c = strInput[i];
        d = strInput[i + 1];
        switch (c) {
            case '{':
                if (d === '{') {
                    capture = '';
                    end = 0;
                    j = i + 2;
                    v = null;
                    while (j < strInput.length) {

                        if (strInput[j] === '}' && strInput[j + 1] === '}') end = 1;
                        if (end) break;
                        capture += strInput[j];
                        j++;
                    }

                    if (end) {
                        var aIndex = parseInt(capture);
                        if (aIndex === 0 || aIndex > 0) {
                            i = j + 2;
                            v = arguments[aIndex + 1];
                            s += g_none(v) ? '' : v;
                            continue;
                        }
                    }
                }
                s += c;
                break;
            default:
                s += c;
                break;
        }
        i++;
    }
    return s;

}
function g_friend(strInput, add) {
    /*
     var rs = g_friend("  Đây là chuỗi tiếng @#$   việt .  ---")
     => "day-la-chuoi-tieng-viet"
     */
    var s = '';
    if (!strInput || strInput.length === 0) return s;
    var i = 0;
    var arr = [
        ['qQ', 'q'],
        ['wW', 'w'],
        ['eéèẻẹEÉÈẺẸêếềểệễÊẾỀỂỆỄ', 'e'],
        ['rR', 'r'],
        ['tT', 't'],
        ['yýỳỷỵỹYÝỲỶỴỸ', 'y'],
        ['uúùủụũUÚÙỦỤŨưứừửựữƯỨỪỰỮ', 'u'],
        ['iíìỉịĩIÍÌỈỊĨ', 'i'],
        ['oóòỏọõOÓÒỎỌÕôốồổộỗÔỐỒỘỖơớờợỡƠỚỜỢỠ', 'o'],
        ['pP', 'p'],
        ['aáàảạãAÁÀẢẠÃâấầẩậẫÂẤẦẨẬẪăắằặẵĂẮẰẲẶẴ', 'a'],
        ['sS', 's'],
        ['dDđĐ', 'd'],
        ['fF', 'f'],
        ['gG', 'g'],
        ['hH', 'h'],
        ['jJ', 'j'],
        ['kK', 'k'],
        ['lL', 'l'],
        ['zZ', 'z'],
        ['xX', 'x'],
        ['cC', 'c'],
        ['vV', 'v'],
        ['bB', 'b'],
        ['nN', 'n'],
        ['mM', 'm']
    ];
    while (i < strInput.length) {
        var c = strInput[i].toLowerCase();
        var r = '-';
        var p = s.length > 0 ? s[s.length - 1] : '';
        if (add && add.indexOf(c) > -1 || '0123456789'.indexOf(c) > -1) {
            r = c;
        } else {
            for (var x = 0; x < arr.length; x++) {
                if (arr[x][0].indexOf(c) > -1) {
                    r = arr[x][1];
                    break;
                }
            }
        }

        if (p === '-' && i === strInput.length - 1) {
            s = s.substr(0, s.length - 1);//remove "-" at end
            break;
        }
        if (r === '-' && p !== '-' || r !== '-') s += r === '-' && s === '' ? '' : r;
        i++;
    }
    return s;
}

function g_render(obj) {
    /*
     var obj = { t:"div", c: "a1 b1 c1",  h: [{ t:"span", c: "a1 b1 c1", a:[["title","title span"]], h: "html span" }], i:"id1" }
     var rs = g_render(obj)
     */
    var arr = [];
    if (Array.isArray(obj)) arr = obj; else arr.push(obj);
    var rs = [];
    arr.forEach(function (x) {
        var a = $('<' + x.t + '/>');
        if (x.a) x.a.forEach(function (at) {
            a.attr(at[0], at[1]);
        });
        if (x.h) {
            if (typeof x.h === 'string')
                a.html(x.h);
            else {
                x.h.forEach(function (ch) {
                    a.append(g_render(ch)[0]);
                });
            }
        }
        if (x.v) a.val(x.v);
        rs.push(a);
    });
    return rs;
}
function g_domobj(element) {
    //Hàm này không hiệu quả về dung lượng khi lưu,
    //để đây cho biết
    var a = $(element),
        b = [];
    if (a.length === 0) return b;
    a.each(function () {
        //
        var t = $(this);
        var a;
        var h;
        var x = {
            t: t.prop('tagName')
        };
        b.push(x);
        if (t.is('input,select,textarea')) {
            x.v = t.val();
        }

        $.each(this.attributes, function () {
            if (this.specified) {
                //console.log(this.name, this.value);
                if (a === undefined) a = [];
                a.push([this.name, this.value]);
            }
        });
        if (a) x.a = a;

        if (t.is('svg')) {
            x.h = t.html();
        } else {
            t.children().each(function () {
                if (h === undefined) h = new Array();
                var ch = g_domobj(this);
                if (ch && ch.length > 0) h.push(ch[0]);
            });

            if (h === undefined && t.hasClass('bind-static')) h = t.text();
        }


        if (h) x.h = h;
    });
    return b;
}

function g_minifyHtml(element) {
    var a = $(element).eq(0);
    if (a.is('svg,script,link,style')) return '';
    var tag = a.prop('tagName');
    var s = '<' + tag;
    var h;
    $.each(a.get(0).attributes, function () {
        if (this.specified && this.name) {
            switch (this.name) {
                case 'href':
                case 'src':
                    return;

            }
            //console.log(this.name, this.value);
            s += ' ' + this.name + '=' + (this.value && this.value.indexOf(' ') > -1 ? '"' + this.value + '"' : this.value);
        }
    });
    s += '>';

    a.children().each(function () {
        if (h === undefined) h = '';
        h += g_minifyHtml(this);
    });

    if (h === undefined && a.hasClass('bind-static')) h = t.text();
    if (h)
        s += h;

    if (!a.is('img,input')) {
        s += '</' + tag + '>';
    }
    return s;
}
function g_zipstring(strInput) {
    /*
     * cắt chuỗi đầu vào theo dấu cách,
     * sắp xếp mảng theo độ dài chuỗi ký tự(dài->ngắn)
     * lấy tối đa 100 thành phần đầu tiên và có độ dài > 4,
     * thay thế chúng tương ứng với {00},{01},...{99},
     * trả ra kq: ["chuỗi đã thay thế","thành phần thay thế bởi {0}","thành phần thay thế bởi {1}"...]
     */



}