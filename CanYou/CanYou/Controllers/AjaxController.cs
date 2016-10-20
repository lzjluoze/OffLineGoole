using Common;
using Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CanYou.Controllers
{
    public class AjaxController : Controller
    {
        //
        // GET: /Ajax/

        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Polyline(string data, string polylineColor)
        {

            Bll.PolylineBll poliLineBll = new Bll.PolylineBll();
            PolylineModel plModel = new PolylineModel();
            plModel.AddTime = DateTime.Now;
            plModel.Color = polylineColor;


     JArray o = (JArray)JsonConvert.DeserializeObject(data);
     IList<JToken> oList =(IList<JToken>)o;
     Bll.MarkerBll bll = new Bll.MarkerBll();
     List<MarkerModel> list = new List<MarkerModel>();
     int rank = 0; 
           foreach(JToken jt in oList)
           {
            JObject jo = jt as JObject;
            rank = rank + 1;
            MarkerModel model = new MarkerModel();
            string lat = jo["lat"].ToString();
            string lng = jo["lng"].ToString();
            model.Lat = lat;
            model.Lng = lng;
            model.Rank = rank;
            model.AddTime = DateTime.Now;

            list.Add(model);

           }

           bll.AddMarKerList(list, plModel);
          // poliLineBll.AddPolyline(plModel);
            return null;
        }



    }
}
