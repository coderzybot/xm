let jscookie = {
    add: function (key, value, day) {
        var d = new Date();
        d.setDate(d.getDate() + day);
        document.cookie = `${key}=${encodeURIComponent(value)};expires=${d}`;
    },
    get: function (key) {
        let cookieArr = decodeURIComponent(document.cookie).split("; ");
        for (let i = 0; i < cookieArr.length; i++) {
            let newArr = cookieArr[i].split("=");
            if (key === newArr[0]) {
                return newArr[1];
            }
        }
    },
    del: function (key) {
        jscookie.add(key, "", -1);
    }
}