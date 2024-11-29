<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSvpUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('svp_user', function (Blueprint $table) {
            $table->integer('user_id')->autoIncrement()->comment('ユーザーID');
            $table->string('login_id', 50)->comment('ユーザーログインID');
            $table->string('student_id', 80)->nullable()->comment('学籍番号');
            $table->string('login_pw', 250)->comment('ユーザーログインPW');
            $table->string('user_name_sei', 25)->nullable()->comment('ユーザー氏名（姓）');
            $table->string('user_name_mei', 25)->nullable()->comment('ユーザー氏名（名）');
            $table->string('user_name_sei_kana', 25)->nullable()->comment('ユーザー氏名カナ（姓）');
            $table->string('user_name_mei_kana', 25)->nullable()->comment('ユーザー氏名カナ（名）');
            $table->string('class_id', 50)->nullable()->comment('ユーザー在籍クラス');
            $table->integer('active_flg')->nullable()->comment('アカウントアクティブステータス');
            $table->dateTime('s_date')->nullable()->comment('アカウント有効期限開始');
            $table->dateTime('e_date')->nullable()->comment('アカウント有効期限終了');
            $table->dateTime('last_login')->nullable()->comment('最終ログイン');
            $table->timestamp('created_at')->useCurrent()->comment('アカウント作成日');
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate()->comment('アカウント更新日');
            $table->unique('login_id');
            $table->index('login_id');
            $table->index('class_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('svp_user');
    }
}
