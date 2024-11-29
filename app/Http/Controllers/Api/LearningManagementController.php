<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request; 

class LearningManagementController extends Controller
{

    public function getCourses()
    {
        // ログインしているユーザーのIDを取得
        $userId = auth()->id();

        // クエリをクエリビルダで作成
        $courses = DB::table('svp_course_relation as sr')
            ->join('svp_category as c1', 'sr.category_id', '=', 'c1.id')
            ->leftJoin('svp_instructor as si', 'c1.instructor_id', '=', 'si.id')
            ->leftJoin(DB::raw('(SELECT parent_id, COUNT(*) as total FROM svp_category_relation GROUP BY parent_id) as scr'), 'scr.parent_id', '=', 'c1.id')
            ->where('sr.user_id', $userId)
            ->groupBy('c1.id') // idでグループ化
            ->select('c1.*', 'si.instructor_name', 'scr.total')
            ->orderBy('id', 'ASC') // 必要に応じて$order変数を追加
            ->get();

        // JSON形式で返却
        // var_dump($courses);
        return response()->json($courses);
    }

    public function getContents(Request $request){
        $userId = $request->query('user_id');
        $categoryId = $request->query('category_id');
        $action = 'firstPlay';
        $sql = "
        SELECT c.contents_id, c.date_time, c.contents_title, c.video_length, c.project_name, 
                ca.name AS cname, info_text, c.doc1, c.doc1title, c.doc2, c.doc2title, 
                c.doc3, c.doc3title, c.doc4, c.doc4title
        FROM svp_contents_info c
        -- ユーザーのアクセス情報を取得
        LEFT JOIN (
            SELECT content_id 
            FROM svp_accesses 
            WHERE user_id = '{$userId}' AND action = '{$action}' 
            GROUP BY content_id
        ) ac ON ac.content_id = c.contents_id
        -- ユーザーに関連するコース情報を取得
        INNER JOIN svp_course_relation r ON r.user_id = '{$userId}'
        -- コースに関連するカテゴリー情報を取得
        INNER JOIN svp_category ca ON ca.id = r.category_id
        -- コンテンツとカテゴリーの関係を取得
        INNER JOIN svp_category_relation cr ON c.contents_id = cr.child_id
        WHERE r.active_flg = 1
        AND cr.parent_id = '{$categoryId}'
        AND cr.parent_id = ca.id
        ORDER BY c.date_time
        ";
        $results = DB::select(DB::raw($sql));
        return response()->json($results);
    }

    public function getContent($contents_id){
        // データベースからコンテンツを取得
        $content = DB::table('svp_contents_info')->where('contents_id',$contents_id)->first();
        //データが存在しない場合の処理
        if(!$content){
            return response()->json(['error' => 'Content not found'], 404);
        }
        //コンテンツをそのままJSON形式で返す
        return response()->json($content);
    }

    public function writelog(Request $request){ 
        //svp_accessesテーブルにログ情報を書き込む
        if(!empty($request->contents_id)&&!empty($request->user_id)){
            $formData = array();
            $content_id = htmlspecialchars($request->contents_id, ENT_QUOTES, 'UTF-8');
            $user_id= intval($request->user_id); 
            $action =  htmlspecialchars($request->action, ENT_QUOTES, 'UTF-8');
            $currentTime = intval($request->currentTime);
            $playbackRate = floatval($request->playbackRate);
            $formData["duration"] = htmlspecialchars($request->duration, ENT_QUOTES, 'UTF-8');
            $formData["pauseCount"] = intval($request->pauseCount);
            $formData["seekCount"] = intval($request->seekCount);
            $formData["from"] = intval($request->from);
            $formData["to"] =  intval($request->to);
            $formData["percentile"] = htmlspecialchars($request->percentile, ENT_QUOTES, 'UTF-8');
            $sessionToken = htmlspecialchars($request->sessionToken, ENT_QUOTES, 'UTF-8');
            $ip = $_SERVER['REMOTE_ADDR'];
            $host = gethostbyaddr($_SERVER['REMOTE_ADDR']);
            $user_agent = $_SERVER['HTTP_USER_AGENT'];

            $date_time = date('Y-m-d H:i:s');

            $custom_field_data = array(
                "pauseCount" => $formData["pauseCount"] ,
                "seekCount" => $formData["seekCount"] ,
                "from" => $formData["from"],
                "to" => $formData["to"],
                "percentile" => $formData["percentile"],
            );

            $custom_field = json_encode($custom_field_data);

             $result = DB::table('svp_accesses')->insert([
                'content_id' => $content_id,
                'user_id' => $user_id,
                'action' => $action,
                'currentTime' => $currentTime,
                'playbackRate' => $playbackRate,
                'ip' => $ip,
                'host' =>  $host,
                'user_agent' => $user_agent,
                'custom_field' => $custom_field,
                'session_token' => $sessionToken,
            ]);

            return $result;
        }
    } 

}