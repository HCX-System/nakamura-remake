<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSvpContentsInfoTable extends Migration

{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('svp_contents_info', function (Blueprint $table) {
            $table->string('contents_id', 25)->primary()->comment('コンテンツ識別子ランダム８文字');
            $table->string('customer_id', 10)->comment('顧客企業ID DB名svpcloud_310〇〇〇と続く数字');
            $table->string('contents_title', 200)->comment('動画のタイトル');
            $table->string('project_name', 200)->comment('コンテンツのカテゴリ');
            $table->integer('subject_no')->comment('カテゴリ内でのID');
            $table->integer('video_length')->comment('ビデオの長さ（秒数）');
            $table->string('doc1', 255)->comment('ダウンロード資料ファイルパス');
            $table->string('doc1title', 255)->comment('ダウンロード資料ファイル名');
            $table->string('doc2', 255)->comment('ダウンロード資料ファイルパス');
            $table->string('doc2title', 255)->comment('ダウンロード資料ファイル名');
            $table->string('doc3', 255)->comment('ダウンロード資料ファイルパス');
            $table->string('doc3title', 255)->comment('ダウンロード資料ファイル名');
            $table->string('doc4', 255)->comment('ダウンロード資料ファイルパス');
            $table->string('doc4title', 255)->comment('ダウンロード資料ファイル名');
            $table->tinyInteger('view')->comment('1:必須');
            $table->timestamp('date_time')->useCurrent()->comment('デフォルトで現在の日時');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('svp_contents_info');
    }
}
