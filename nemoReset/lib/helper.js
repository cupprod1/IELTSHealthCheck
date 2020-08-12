
module.exports =
{
    getTimeStamp: function () {
        var d = new Date();
        var dateStamp = d.toLocaleString({
            weekday: 'narrow',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZoneName: 'short',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            era: 'short'
        }).replace('/', '-').replace('/', '-').replace(':', '_').replace(':', '_');
        return dateStamp;
    }
};
