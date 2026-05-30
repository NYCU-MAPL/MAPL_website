/*=================================================
Add for current members
=================================================*/
function go_cur_members(){
	var parent = $('#left_parent');
	var parent2 = $('#left_parent2');
	$('.left_ele').remove();
	var newele = `
	<div class="left_ele title_style">
		Current Members
	</div>`;
	
	var newele2 = `
        <div class="left_ele ele_container">
            <div class="title">Advisor</div>
            <table class="member_table">
                <tbody>
                    <tr>
                        <td><img class="advisor_style" src='members/advisor.png'><img></td>
                        <td>
                            <div style="font-weight:bolder;color:blue">Prof. Wen-Hsiao Peng, NCTU CS</div>
                            <div><a href="https://www.cs.nctu.edu.tw/">Department of Computer Science, National Chiao Tung University</a></div>
                            <div><span style="font-weight:bolder;">Research Highlights:</span>Machine/deep learning, ISO/IEC & ITU-T video coding standards</div>
                            <div><span style="font-weight:bolder;">Office: </span>Room 431, Engineering Building 3</div>
                            <div><img class="icon_css" src='figures/email.jpg'></img><a href="mailto:wpeng@cs.nctu.edu.tw"> wpeng@cs.nctu.edu.tw</a></div>
                            <div>
                                <img class="icon_css" src='figures/web.png'></img>
                                <a href="https://sites.google.com/g2.nctu.edu.tw/wpeng">Personal Website</a> | 
                                <a href="https://scholar.google.com/citations?user=HucsFB4AAAAJ&hl=en">Google Scholar</a> | 
                                <a href="https://www.google.com/url?q=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fwen-hsiao-peng-02752b141%2F&sa=D&sntz=1&usg=AFQjCNF4fUU-UdJ0UaACYsu17FzEh1LdAA">LinkedIn</a>
                            </div>
                        </td>
                    </tr>
               </tbody>
            </table>
            <div class="title">Ph.D. Students</div>
            <table class="member_table" style="text-align:center;">
                <tbody>
                    <tr>
                        <td>
                            <img class="member_style" src='members/Christine.jpg'></img>
                            <div>林惠婷 Hui-Ting Lin</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:lin.huiting.christine@gmail.com">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="https://sites.google.com/site/huitinglinchristine/">Website</a>
                         </td>
                         <td>
                            <img class="member_style" src='members/hector.jpg'></img>
                            <div>何永涵 Yung-Han Ho</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:hectorho0409@gmail.com">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="#">Website</a>
                         </td>
                         <td>
                            <img class="member_style" src='members/Niraj.jpg'></img>
                            <div>Niraj Prakash Kini</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:nirajnctu17@gmail.com">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="#">Website</a>
                         </td>
                    </tr>
                </tbody>
            </table>
            <div class="title">Master Students</div>
            <table class="member_table" style="text-align:center;">
                <tbody>
                    <tr>
                        <td>
                            <img class="member_style" src='members/nopicture.jpg'></img>
                            <div>潘順益 Shun-Yi Pan</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:sypan.cser@gmail.com">Email</a>
                         </td>
                         <td>
                            <img class="member_style" src='members/nopicture.jpg'></img>
                            <div>鍾嘉峻</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:zhongturtle@gmail.com">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="https://sites.google.com/site/zhongjiajunprofile/">Website</a>
                         </td>
                         <td>
                            <img class="member_style" src='members/nopicture.jpg'></img>
                            <div>李仕柏 Shih-Po Lee</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:robert80203@gmail.com">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="https://robert80203.github.io/">Website</a>
                         </td>
                         <td>
                            <img class="member_style" src='members/nopicture.jpg'></img>
                            <div>黃彥誠</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:ding3820@gmail.com">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="https://www.linkedin.com/in/ding3820/">Website</a>
                         </td>
                         <td>
                            <img class="member_style" src='members/nopicture.jpg'></img>
                            <div>陳詒歆</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:yhchen12101@gmail.com">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="https://www.linkedin.com/in/yihsinchen/">Website</a>
                         </td>
                    </tr>
                    <tr>
                         <td>
                            <img class="member_style" src='members/nopicture.jpg'></img>
                            <div>金國倫</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:handsome74107410@gmail.com">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="https://www.linkedin.com/in/guo-lun-jin/">Website</a>
                         </td>
                         <td>
                            <img class="member_style" src='members/nopicture.jpg'></img>
                            <div>詹智鈞</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:dororojames.cs07g@nctu.edu.tw">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="https://www.linkedin.com/in/智鈞-詹-02299ba9/">Website</a>
                         </td>
                         <td>
                            <img class="member_style" src='members/nopicture.jpg'></img>
                            <div>梁允</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:#">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="#">Website</a>
                         </td>
                         <td>
                            <img class="member_style" src='members/nopicture.jpg'></img>
                            <div>張之芃</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:#">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="#">Website</a>
                         </td>
                         <td>
                            <img class="member_style" src='members/nopicture.jpg'></img>
                            <div>李美惠</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:#">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="#">Website</a>
                         </td>
                     </tr>
                     <tr>
                         <td>
                            <img class="member_style" src='members/nopicture.jpg'></img>
                            <div>陳鵬宇</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:#">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="#">Website</a>
                         </td>
                         <td>
                            <img class="member_style" src='members/nopicture.jpg'></img>
                            <div>林志軒</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:#">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="#">Website</a>
                         </td>
                         <td>
                            <img class="member_style" src='members/nopicture.jpg'></img>
                            <div>陳璽存</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:#">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="#">Website</a>
                         </td>
                         <td>
                            <img class="member_style" src='members/nopicture.jpg'></img>
                            <div>翁英傑</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:#">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="#">Website</a>
                         </td>
                    </tr>
                </tbody>
            </table>
            <div class="title">Undergraduate Students</div>
            <table class="member_table" style="text-align:center;">
                <tbody>
                    <tr>
                        <td>
                            <img class="member_style" src='members/nopicture.jpg'></img>
                            <div>劉姿利</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:#">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="#">Website</a>
                         </td>
                         <td>
                            <img class="member_style" src='members/nopicture.jpg'></img>
                            <div>楊政道</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:#">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="#">Website</a>
                         </td>
                         <td>
                            <img class="member_style" src='members/nopicture.jpg'></img>
                            <div>施囿維</div>
                            <span><img class="icon_css" src='figures/email.jpg'></img></span>
                            <a href="mailto:#">Email</a>
                            <span><img class="icon_css" src='figures/web.png'></img></span>
                            <a href="#">Website</a>
                         </td>
                    </tr>
                </tbody>
            </table>
        </div>`;
	parent.append(newele);
	parent2.append(newele2);
}

/*=================================================
Add materials for alumni
=================================================*/
function go_alu(){
	var parent = $('#left_parent');
	var parent2 = $('#left_parent2');
	$('.left_ele').remove();
	var newele = `
	<div class="left_ele title_style">
		Alumni
	</div>`;
	
	var newele2 = `
        <div class="left_ele ele_container">
            <div class="title">2017 Ph.D. Graduates </div>
            <table class="member_table">
                <tbody>
                    <tr>
                        <td><img class="advisor_style" src='members/phd_graduates/ChunChiChen2015.jpg'><img></td>
                        <td>
                            <div>Chun-Chi Chen, 陳俊吉</div>
                            <div>
                                <img class="icon_css" src='figures/email.jpg'></img><span>Email: </span>
                                <a href="mailto:cheerchen.cs98g@g2.nctu.edu.tw">cheerchen.cs98g@g2.nctu.edu.tw</a>,
                                <a href="mailto:cheerchen73@gmail.com">cheerchen73@gmail.com</a>
                            </div>
                            <div>
                                <img class="icon_css" src='figures/web.png'></img>
                                <a href="http://mapl.nctu.edu.tw/ogre">Personal Website</a>
                            </div>
                            <div>
                                <img class="icon_css" src='figures/work.jpg'></img>
                                <span>Mandatory National Service (Term ends on Februay 6, 2018)</span>
                            </div>
                        </td>
                    </tr>
               </tbody>
            </table>
            <div class="title">2011 Ph.D. Graduates</div>
            <table class="member_table">
                <tbody>
                    <tr>                 
                        <td><img class="advisor_style" src='members/phd_graduates/YiWenChen.jpg'><img></td>
                        <td>
                            <div>Yi-Wen Chen (Jeff), 陳渏紋</div>
                            <div>
                                <img class="icon_css" src='figures/email.jpg'></img><span>Email: </span>
                                <a href="mailto:yiwench@gti.qualcomm.com">yiwench@gti.qualcomm.com</a>,
                                <a href="mailto:ewchen@csie.nctu.edu.tw">ewchen@csie.nctu.edu.tw</a>
                            </div>
                            <div>
                                <img class="icon_css" src='figures/web.png'></img>
                                <a href="https://tw.linkedin.com/in/yi-wen-chen-180b1059">Personal Website</a>
                            </div>
                            <div>
                                <img class="icon_css" src='figures/work.jpg'></img>
                                <span>Qualcomm, San Diego, CA, USA</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="title">2010 Ph.D. Graduates</div>
            <table class="member_table">
                <tbody>
                    <tr>                 
                        <td><img class="advisor_style" src='members/nopicture.jpg'><img></td>
                        <td>
                            <div>Hung-Chih Lin, 林鴻志</div>
                            <div>
                                <img class="icon_css" src='figures/email.jpg'></img><span>Email: </span>
                                <a href="mailto:hclin.ee93g@nctu.edu.tw">hclin.ee93g@nctu.edu.tw</a>
                            </div>
                            <div>
                                <img class="icon_css" src='figures/web.png'></img>
                                <a href="http://mapl.nctu.edu.tw/hclin">Personal Website</a> |
                                <a href="https://tw.linkedin.com/in/hung-chih-lin-1a7b0975">LinkedIn</a>
                            </div>
                            <div>
                                <img class="icon_css" src='figures/work.jpg'></img>
                                <span>MediaTek (聯發科技), Hsinchu, Taiwan</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="title">2010 Ph.D. Graduates</div>
            <table class="member_table">
                <tbody>
                    <tr>                 
                        <td><img class="advisor_style" src='members/nopicture.jpg'><img></td>
                        <td>
                            <div>Chih-Hung Li, 李志鴻</div>
                            <div>
                                <img class="icon_css" src='figures/email.jpg'></img><span>Email: </span>
                                <a href="mailto:chihhung.li@gmail.com">chihhung.li@gmail.com</a>
                            </div>
                            <div>
                                <img class="icon_css" src='figures/web.png'></img>
                                <a href="http://mapl.nctu.edu.tw/chihhung">Personal Website</a> |
                            </div>
                            <div>
                                <img class="icon_css" src='figures/work.jpg'></img>
                                <span>Ambarella (安霸股份有限公司), Hsinchu, Taiwan</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="title">2019</div>
                <table class="member_table" style="text-align:center;">
                    <tbody>
                        <tr>
                            <td>
                                <img class="member_style" src='members/alumni/wangmeng.jpg'></img>
                                <div>王濛 Meng Mang</div>
                                <span><img class="icon_css" src='figures/email.jpg'></img></span>
                                <a href="mailto:mm20103462@gmail.com">Email</a>
                                <span><img class="icon_css" src='figures/web.png'></img></span>
                                <a href="https://sites.google.com/site/mengwang404/">Website</a>
                             </td>
                             <td>
                                <img class="member_style" src='members/alumni/francis.jpg'></img>
                                <div>張硯為 Yen-Wei Chang</div>
                                <span><img class="icon_css" src='figures/email.jpg'></img></span>
                                <a href="mailto:francis87192@gmail.com">Email</a>
                                <span><img class="icon_css" src='figures/web.png'></img></span>
                                <a href="http://people.cs.nctu.edu.tw/~changyw03/">Website</a>
                             </td>
                             <td>
                                <img class="member_style" src='members/nopicture.jpg'></img>
                                <div>卓泉源</div>
                                <span><img class="icon_css" src='figures/email.jpg'></img></span>
                                <a href="mailto:u09800103@gmail.com">Email</a>
                                <span><img class="icon_css" src='figures/web.png'></img></span>
                                <a href="https://sites.google.com/site/u09800103/home">Website</a>
                             </td>
                             <td>
                                <img class="member_style" src='members/nopicture.jpg'></img>
                                <div>王暉博</div>
                                <span><img class="icon_css" src='figures/email.jpg'></img></span>
                                <a href="mailto:a88575847@gmail.com">Email</a>
                                <span><img class="icon_css" src='figures/web.png'></img></span>
                                <a href="https://sites.google.com/site/huipowangpersonalwebsite/">Website</a>
                             </td>
                             <td>
                                <img class="member_style" src='members/nopicture.jpg'></img>
                                <div>陳梅香</div>
                                <span><img class="icon_css" src='figures/email.jpg'></img></span>
                                <a href="mailto:stefanie.tan95@gmail.com">Email</a>
                             </td>
                        </tr>
                    </tbody>
                </table>
                <div class="title">2018</div>
                <table class="member_table" style="text-align:center;">
                    <tbody>
                        <tr>
                            <td>
                                <img class="member_style" src='members/nopicture.jpg'></img>
                                <div>潘韋志</div>
                                <span><img class="icon_css" src='figures/email.jpg'></img></span>
                                <a href="mailto:gaga820402@gmail.com">Email</a>
                                <span><img class="icon_css" src='figures/web.png'></img></span>
                                <a href="https://sites.google.com/site/sagamaplsites/">Website</a>
                             </td>
                             <td>
                                <img class="member_style" src='members/nopicture.jpg'></img>
                                <div>胡俊顥</div>
                                <span><img class="icon_css" src='figures/email.jpg'></img></span>
                                <a href="mailto:hujh@cs.nctu.edu.tw">Email</a>
                                <span><img class="icon_css" src='figures/web.png'></img></span>
                                <a href="https://sites.google.com/site/junhaohuhome/">Website</a>
                             </td>
                             <td>
                                <img class="member_style" src='members/nopicture.jpg'></img>
                                <div>陳蓮清</div>
                                <span><img class="icon_css" src='figures/email.jpg'></img></span>
                                <a href="mailto:connie980149@gmail.com">Email</a>
                             </td>
                        </tr>
                    </tbody>
                </table>
                <div class="title">2017</div>
                <table class="member_table" style="text-align:center;">
                    <tbody>
                        <tr>
                            <td>
                                <img class="member_style" src='members/nopicture.jpg'></img>
                                <div>鍾佳樺 Chia-Hua Chung</div>
                                <span><img class="icon_css" src='figures/email.jpg'></img></span>
                                <a href="mailto:jason0602q@gmail.com">Email</a>
                                <span><img class="icon_css" src='figures/web.png'></img></span>
                                <a href="https://sites.google.com/site/chiahuachunghome/">Website</a>
                             </td>
                        </tr>
                    </tbody>
                </table>
                <div class="title">2016</div>
                <table class="member_table" style="text-align:center;">
                    <tbody>
                        <tr>
                            <td>
                                <img class="member_style" src='members/nopicture.jpg'></img>
                                <div>葉志燊</div>
                                <span><img class="icon_css" src='figures/email.jpg'></img></span>
                                <a href="mailto:a7983524@gmail.com">Email</a>
                             </td>
                             <td>
                                <img class="member_style" src='members/nopicture.jpg'></img>
                                <div>李尚哲</div>
                                <span><img class="icon_css" src='figures/email.jpg'></img></span>
                                <a href="mailto:maxlee0782@gmail.com">Email</a>
                             </td>
                             <td>
                                <img class="member_style" src='members/nopicture.jpg'></img>
                                <div>李聖捷</div>
                                <span><img class="icon_css" src='figures/email.jpg'></img></span>
                                <a href="mailto:prince147258369@yahoo.com.tw">Email</a>
                             </td>
                             <td>
                                <img class="member_style" src='members/nopicture.jpg'></img>
                                <div>李碩恩</div>
                                <span><img class="icon_css" src='figures/email.jpg'></img></span>
                                <a href="mailto:victor820707@hotmail.com.tw">Email</a>
                             </td>
                             <td>
                                <img class="member_style" src='members/nopicture.jpg'></img>
                                <div>林旻萱</div>
                                <span><img class="icon_css" src='figures/email.jpg'></img></span>
                                <a href="mailto:superdog0420@gmail.com">Email</a>
                             </td>
                        </tr>
                        <tr>
                            <td>
                                <img class="member_style" src='members/nopicture.jpg'></img>
                                <div>陳翌綺</div>
                                <span><img class="icon_css" src='figures/email.jpg'></img></span>
                                <a href="mailto:s810904@hotmail.com">Email</a>
                             </td>
                             <td>
                                <img class="member_style" src='members/nopicture.jpg'></img>
                                <div>柯婷文</div>
                                <span><img class="icon_css" src='figures/email.jpg'></img></span>
                                <a href="mailto:koikerabbit@gmail.com">Email</a>
                             </td>
                        </tr>
                    </tbody>
                </table>
       </div>
	`;
	parent.append(newele);
	parent2.append(newele2);
}

/*=================================================
Add materials for PhD graduates
=================================================*/
function go_phdgrad(){
	var parent = $('#left_parent');
	var parent2 = $('#left_parent2');
	$('.left_ele').remove();
	var newele = `
	<div class="left_ele title_style">
		Ph.D. Graduates
	</div>`;
	
	var newele2 = `
        <div class="left_ele ele_container">
            <div class="title">2017</div>
            <table class="member_table">
                <tbody>
                    <tr>
                        <td><img class="advisor_style" src='members/phd_graduates/ChunChiChen2015.jpg'><img></td>
                        <td>
                            <div>Chun-Chi Chen, 陳俊吉</div>
                            <div>
                                <img class="icon_css" src='figures/email.jpg'></img><span>Email: </span>
                                <a href="mailto:cheerchen.cs98g@g2.nctu.edu.tw">cheerchen.cs98g@g2.nctu.edu.tw</a>,
                                <a href="mailto:cheerchen73@gmail.com">cheerchen73@gmail.com</a>
                            </div>
                            <div>
                                <img class="icon_css" src='figures/web.png'></img>
                                <a href="http://mapl.nctu.edu.tw/ogre">Personal Website</a>
                            </div>
                            <div>
                                <img class="icon_css" src='figures/work.jpg'></img>
                                <span>Mandatory National Service (Term ends on Februay 6, 2018)</span>
                            </div>
                        </td>
                    </tr>
               </tbody>
            </table>
            <div class="title">2011</div>
            <table class="member_table">
                <tbody>
                    <tr>                 
                        <td><img class="advisor_style" src='members/phd_graduates/YiWenChen.jpg'><img></td>
                        <td>
                            <div>Yi-Wen Chen (Jeff), 陳渏紋</div>
                            <div>
                                <img class="icon_css" src='figures/email.jpg'></img><span>Email: </span>
                                <a href="mailto:yiwench@gti.qualcomm.com">yiwench@gti.qualcomm.com</a>,
                                <a href="mailto:ewchen@csie.nctu.edu.tw">ewchen@csie.nctu.edu.tw</a>
                            </div>
                            <div>
                                <img class="icon_css" src='figures/web.png'></img>
                                <a href="https://tw.linkedin.com/in/yi-wen-chen-180b1059">Personal Website</a>
                            </div>
                            <div>
                                <img class="icon_css" src='figures/work.jpg'></img>
                                <span>Qualcomm, San Diego, CA, USA</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="title">2010</div>
            <table class="member_table">
                <tbody>
                    <tr>                 
                        <td><img class="advisor_style" src='members/nopicture.jpg'><img></td>
                        <td>
                            <div>Hung-Chih Lin, 林鴻志</div>
                            <div>
                                <img class="icon_css" src='figures/email.jpg'></img><span>Email: </span>
                                <a href="mailto:hclin.ee93g@nctu.edu.tw">hclin.ee93g@nctu.edu.tw</a>
                            </div>
                            <div>
                                <img class="icon_css" src='figures/web.png'></img>
                                <a href="http://mapl.nctu.edu.tw/hclin">Personal Website</a> |
                                <a href="https://tw.linkedin.com/in/hung-chih-lin-1a7b0975">LinkedIn</a>
                            </div>
                            <div>
                                <img class="icon_css" src='figures/work.jpg'></img>
                                <span>MediaTek (聯發科技), Hsinchu, Taiwan</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="title">2010</div>
            <table class="member_table">
                <tbody>
                    <tr>                 
                        <td><img class="advisor_style" src='members/nopicture.jpg'><img></td>
                        <td>
                            <div>Chih-Hung Li, 李志鴻</div>
                            <div>
                                <img class="icon_css" src='figures/email.jpg'></img><span>Email: </span>
                                <a href="mailto:chihhung.li@gmail.com">chihhung.li@gmail.com</a>
                            </div>
                            <div>
                                <img class="icon_css" src='figures/web.png'></img>
                                <a href="http://mapl.nctu.edu.tw/chihhung">Personal Website</a> |
                            </div>
                            <div>
                                <img class="icon_css" src='figures/work.jpg'></img>
                                <span>Ambarella (安霸股份有限公司), Hsinchu, Taiwan</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
       </div>
	`;
	parent.append(newele);
	parent2.append(newele2);
}