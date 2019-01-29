<%@ Page Language="C#" %>

<!DOCTYPE html>

<script runat="server">

    string rs = "";

    public void Page_load(object obj, EventArgs e)
    {
        if (Request.QueryString["q"] != null)
        {

            var d = new System.IO.DirectoryInfo(Server.MapPath(""));
            rs = "[";
            string c = "";
            foreach (var f in d.GetFiles("*").OrderBy(x => x.Name))
            {
                var ext = f.Extension.ToLower();
                if (ext.IndexOf("html") == -1) continue;
                rs += c + string.Format("[\"{0}\",\"{1}\"]", f.Name, f.LastWriteTime.Ticks);
                c = ",";
            }
            rs += "]";
        }
    }
</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Html Templates</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <style>
        body
        {
            min-height: 100%
        }

        .v
        {
            transform-origin: left top
        }

        .i
        {
            float: left;
            width: 375px;
            height: 667px;
            padding: 30px 0 40px 10px;
            border: none;
            position: relative;
        }

        .i:before
        {
            content: attr(title);
            display: block;
            text-align: center;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            color: #eee;
            font-size: 11px;
            line-height: 30px;
        }

        iframe
        {
            width: 100%;
            height: 100%;
            display: block;
            border: none;
            background: #fff;
            border-radius: 10px
        }

        .zoom-100 .v
        {
            transform: scale(1)
        }

        .zoom-75 .v
        {
            transform: scale(0.7);
            width: 140vw;
        }

        .zoom-50 .v
        {
            transform: scale(0.5);
            width: 197vw;
        }

        a
        {
            color: #999 !important;
            cursor: pointer;
            text-decoration: none;
            font-size: 11px
        }

        a:active, a:focus, a:hover
        {
            color: #fff !important
        }
    </style>
    <script src="a.js"></script>
</head>
<body class="bg-dark zoom-<%=Request.QueryString["zoom"] %>">
    <!--rs:<%=rs %>-->
    <div class="v"></div>
    <div style="display: none">
        <input type="checkbox" checked="checked" required="required" value="123" />
        <input type="text" readonly="" required="required" value="456" />
        <textarea>9999</textarea>
        <select>
            <option selected="selected" value="100"></option>
            <option value="200"></option>
        </select>
    </div>
    <script>
        var d = [];
        var t = document.title;
        function get() {
            document.title = 'getting...';
            $.get('?q=1', function (html) {

                var a1 = '<!--rs:';
                var a2 = '-->';
                var i1 = html.indexOf(a1);
                var i2 = html.indexOf(a2);
                var s = html.substring(i1 + a1.length, i2);
                try {
                    var arr = JSON.parse(s);

                    window.a = arr;
                    d.forEach(function (x) {
                        x[2].addClass('pending');
                    })
                    arr.forEach(function (z) {
                        var has = false;
                        var url = '<iframe src="' + z[0] + '?t=' + (new Date().getTime()) + '" /><div><a data-cmd="html">Html</a> | <a data-cmd="bind">Bind</a></div>';

                        d.every(function (z2) {

                            if (z[0] == z2[0]) {
                                has = true;
                                if (z[1] != z2[1]) {
                                    z2[1] = z[1];
                                    z2[2].html(url);
                                }
                                z2[2].removeClass('pending');
                                //x[1]
                            }

                            return !has;
                        })
                        if (!has) {
                            d.push([z[0], z[1], $('<div class="i" title="' + z[0] + '" />').appendTo('.v').html(url)]);
                        }


                    })

                    $('.pending').fadeOut(function () {
                        $(this).remove();
                    })



                } catch (e) {

                }

                setTimeout(function () {
                    document.title = t;
                }, 1000)

            }, 'text').always(function () {
                setTimeout(get, 30000);
            });
        }

        get();


        var data = [];
        function bind() {
            try {
                var a = $(this).closest('.modal');
                var b = a.find('input.a');
                var c = $(current).closest('.i').find('iframe').contents().find('body');
                var name = '__';

                var lstSelector = b.eq(0).val();
                var itemSelector = b.eq(1).val();
                var propHandlers = b.eq(2).val().split(';');

                var lst = c.find(lstSelector);
                if (!window[name]) {
                    var temp = $('<div/>').hide().appendTo('body');
                    temp.html(lst.find(itemSelector))
                    window[name] = temp.html();
                }

               
                lst.empty();

                data.forEach(function (x, i) {
                    //x: propSelector,fnNameHandler

                    var $item = $(window[name]);

                    propHandlers.forEach(function (p) {
                        var segs = p.split(',');
                        //seg[0]: tên thuộc tính
                        //seg[1]: selector, cái bind thuộc tính
                        //seg[2]: hàm window.fn để sử lý
                        var $p = $item.find(segs[1]);
                        var v = x[segs[0]];
                        

                        if (segs[2] && window[segs[2]]) window[segs[2]]({ value: v, $prop: $p, $item: $item, dataItem: x, dataIndex: i })
                        else $p.html(v);
                    })
                    lst.append($item);
                })
            } catch (e) {
                throw e;
            }
        }
        function createTbInputData() {
            var a = $(this),
                b = a.closest('.modal-body'),
                tb = b.find('table'),
                inp = b.find('input');
            var n = parseInt(inp.eq(0).val());
            var cols = inp.eq(1).val().split(',');
            tb.empty();
            var th = g_$('thead').appendTo(tb);
            var tr = g_$('tr').appendTo(th);
            cols.forEach(function (c) {
                tr.append('<th>' + c);
            })

            var tbody = g_$('tbody').appendTo(tb);
            data = [];
            for (var i = 0; i < n; i++) {
                var x = {};
                var tr = g_$('tr').appendTo(tbody);
                cols.forEach(function (c) {
                    x[c] = c + ' ' + (i + 1);

                    tr.append([
                        g_$('td', g_$('input.form-control').val(x[c]).change(function () { x[c] = this.value; }))
                    ])

                })

                data.push(x);

            }


        }

        var current;

        $(document).click(function (e) {
            var a = $(e.target);
            var cmd = a.attr('data-cmd');
           
            switch (cmd) {
                case 'html':
                    var body = a.closest('.i').find('iframe').contents().find('body');

                    g_modal({
                        'body': [
                            g_$('div').html([
                                g_$('textarea.form-control.mb-3').val(body.html()),
                                g_$('textarea.form-control').val(g_minifyHtml(body))
                            ])
                        ]
                    })
                    break;
                case 'bind':
                     current = a;
                    g_modal({
                        'size': 'lg',
                        'body': [
                            g_$('div.row.mb-2').html([
                                g_$('.col-5', '<input class="form-control" placeholder="Rows" value=5 >'),
                                g_$('.col-5', '<input class="form-control" placeholder="ColumnBames" value="ID,Title,Photo,Desc,Price" >'),
                                g_$('.col-2', '<a class="btn btn-block btn-success" >Tạo</a>').click(createTbInputData)
                            ]),
                            g_$('div.row.mb-5').html([
                                g_$('.col-12', g_$('table.table.table-bordered')),
                            ]),
                            g_$('div.row').html([
                                g_$('.col-12').html([
                                    g_$('h3', 'Tham số bind'),
                                    $('<input class="form-control mb-1 a" placeholder="Selector list " />').val(localStorage.getItem('a0') || '').change(function () { localStorage.setItem('a0', this.value) }),
                                    $('<input class="form-control mb-1 a" placeholder="Selector item " />').val(localStorage.getItem('a1') || '').change(function () { localStorage.setItem('a1', this.value) }),
                                    $('<input class="form-control mb-1 a" placeholder="Selector prop, " />').val(localStorage.getItem('a2') || '').change(function () { localStorage.setItem('a2', this.value) })
                                ]),
                            ])
                        ],
                        'buttons': [
                            g_$('a.btn.btn-success').html('Bind').click(bind)
                        ]
                    })
                    break;
            }
        })
    </script>
</body>
</html>
