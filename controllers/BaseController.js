
class BaseController {

    constructor (req) {
        this.req = req
    }



    /**
     * @param {String} type
     * @param {Object} payload
     */
    setSession (type, payload) {
        return new Promise((resolve, reject) => {
            if("session" in this.req){this.req.session[type] = payload; resolve()}
            else reject();
        })
    }


    /**
     * @param {String} targetWho
     * @param {Object} payload
     */
    isLoggedIn (targetWho) {
        if("session" in this.req && targetWho in this.req.session) return true;
        else return ;
    }



    /**
     * @param {String} type
     * @param {Object} payload
     */
    clearSession () {
        return new Promise((resolve, reject) => {
            if("session" in this.req){this.req.session.destroy(); resolve()}
            else reject();
        })
    }


}
module.exports = BaseController;


