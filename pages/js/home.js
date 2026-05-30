/*=================================================
Add materials for homepage
=================================================*/
function go_home(){
	var parent = $('#left_parent');
	var parent2 = $('#left_parent2');
	$('.left_ele').remove();
	var newele = `
		<!--<div class="left_ele title_home">
		</div>-->
        <div class="left_ele ele_container">
            <div>
                <div class="title">Highlights of our research</div>
                <img src="photos/pic2.jpg" style="height:230px;width:430px;float: right;"></img>
                <div class="topic">Image/Video Compression</div>
                <ul class="list">
                    <li>Reinforcement learning for video encoder control</li>
                    <li>Learning-based video compression</li>
                    <li>Learning-based image compression</li>
                </ul>
                <div class="topic">Image/Video Semantic Segmentation</div>
                <ul class="list">
                    <li>Domain adaptation for semantic segmentation</li>
                    <li>Weakly supervised semantic segmentation</li>
                    <li>Fast video-based semantic segmentation</li>
                </ul>
                <div class="topic">Incremental Learning</div>
                <div class="topic">Video Super-Resolution</div>
                <div class="topic">AI Drone</div>
            </div>
        </div>`
    var newele2 = `
		<div class="ele_container left_ele">
            <span class="title">News & Events</span>
            <div class="content"><span class="date">June 2020</span> Prof. Wen-Hsiao Peng served as Co-organizer of the IEEE TCSVT Special Section on Learning-based Image and Video Compression (to appear in the 2020 July issue).</div>
            <div class="content"><span class="date">January 2020</span> Prof. Wen-Hsiao Peng was appointed as Associate Editor-in-Chief of Digital Communications for IEEE Journal on Emerging and Selected Topics in Circuits and Systems (JETCAS).</div>
            <div class="content">
                <span class="date">September 2019</span> [Invited Talk] Beyond end-to-end learning: Dialog system, sentence generation, and conversation analysis for automatic mental disorder diagnosis.
                <div><span style="font-weight:bolder">Honorary Speaker</span>: Prof. Yoshinobu Kano</div>
                <div><span style="font-weight:bolder">Time</span>: 14:00 - 15:00, Monday, 30 September, 2019</div>
                <div><span style="font-weight:bolder">Venue</span>: National Chiao Tung University, EC321 (交通大學工程三館 EC321)</div>
                <div><span style="font-weight:bolder">Information</span>: <a href="./../../../sample/20190930_Yoshinobu_Talk.pdf">here</a></div>
             </div>
             <div class="content"><span class="date">July 2019</span> Congratulations to our student Hui-Po Wang on being admitted into the internship program with Max Planck Institute, Germany.</div>
             <div class="content"><span class="date">March 2019</span> Prof. Wen-Hsiao Peng gave an APSIPA DL talk on Reinforcement Learning for Video Encoder Control and Video Prediction at Sungkyunkwan Univ., Suwon, South Korea.</div>
             <div class="content"><span class="date">February 2019</span> Prof. Wen-Hsiao Peng was appointed as Associate Editor of IEEE Transactions on Circuits and Systems for Video Technology (TCSVT).</div>
        </div>`;
    parent.append(newele);
	parent2.append(newele2);
	alert("out");
}

function go_pastnews(){
	var parent = $('#left_parent');
	var parent2 = $('#left_parent2');
	$('.left_ele').remove();
	var newele = `
        <div class="left_ele ele_container">
        </div>`
    var newele2 = `
		<div class="ele_container left_ele">
            <span class="title">News & Events</span>

            <div class="content"><span class="date">November 2023</span> For more information about Prof.
                Wen-Hsiao Peng, please check out his personal webpage
                    <a href="https://sites.google.com/g2.nctu.edu.tw/wpeng/cv"> here. </a>
            </div>

            <div class="content"><span class="date">October 2023</span> We are recruiting highly self-motivated
                students to join our lab! Please contact Julie (<a
                    href="mailto:yhchen12101@gmail.com">Email</a>) for further details! 
                    This <a href="./pages/research/MAPL.pdf">PDF</a> 
                    is a brief introduction about our research. 
                    <a href="./pages/joinus.html"> More.. </a>
            </div>

            <div class="content"><span class="date"> October 2023</span>
                Congratulations to S.-C. Chen and Y.-C. Chen on receiving the Sixteenth 
                <a href="https://thesis.topco-global.com/TopcoTRC/index.aspx">TSC Thesis Award (崇越論文大賞)</a>. (Pics:
                <a class="myImg" href="javascript:void(0)" onclick="show(14)">1</a>, 
                <a class="myImg" href="javascript:void(0)" onclick="show(15)">2</a>,
                <a class="myImg" href="javascript:void(0)" onclick="show(16)">3</a>)
            </div>
            
            <div class="content"><span class="date"> October 2023</span>
                Picture Coding Symposium 2024 is calling for papers (<a
                href="https://2024.picturecodingsymposium.org/wp-content/uploads/sites/426/2023/09/PCS24_CfP.pdf" target="_blank">PDF</a>). 
                Visit the conference website for more details: 
                <a href="https://2024.picturecodingsymposium.org/">here</a> 
            </div>

            <div class="content"><span class="date"> October 2023</span>
                Yi-Hsin Chen gave a talk on Prompt-conditioned Transformer-based Image Compression at University of Brescia, Italy 
                and Leibniz Universität Hannover, Germany. 
            </div>

            <div class="content"><span class="date"> October 2023</span>
                Prof. Wen-Hsiao Peng gave an <a href="https://ieee-cas.org/">IEEE CASS</a> Distinguished Lecture talk on <a
                href="./pages/research/CASS_2023.pdf" target="_blank">End-to-End Learned Image and Video Compression: 
                Design, Implementation, and Computer Vision Applications</a> at University of Brescia, Italy. (Pics:
                <a class="myImg" href="javascript:void(0)" onclick="show(8)">1</a>, 
                <a class="myImg" href="javascript:void(0)" onclick="show(9)">2</a>, 
                <a class="myImg" href="javascript:void(0)" onclick="show(10)">3</a>)
            </div>

            <div class="content"><span class="date"> October 2023</span>
                Prof. Wen-Hsiao Peng gave a talk on ANF-based learned image and video coding at Leibniz Universität Hannover, Germany. (Pics:
                <a class="myImg" href="javascript:void(0)" onclick="show(13)">1</a>, 
                <a class="myImg" href="javascript:void(0)" onclick="show(12)">2</a>, 
                <a class="myImg" href="javascript:void(0)" onclick="show(11)">3</a>)
            </div>
            
            <div class="content"><span class="date"> October 2023</span>
                A tutorial talk on "<a href="https://nycu-mapl.github.io/ICCV2023_Learned_Image_and_Video_Compression_Tutorial/" target="_blank">Learned
                    Image and Video Compression: Design, Implementation, and Computer Vision Applications</a>" 
                    was given by Prof. Wen-Hsiao Peng at ICCV 2023 in Paris. (Pics:
                <a class="myImg" href="javascript:void(0)" onclick="show(1)">1</a>, 
                <a class="myImg" href="javascript:void(0)" onclick="show(2)">2</a>, 
                <a class="myImg" href="javascript:void(0)" onclick="show(3)">3</a>, 
                <a class="myImg" href="javascript:void(0)" onclick="show(4)">4</a>, 
                <a class="myImg" href="javascript:void(0)" onclick="show(5)">5</a>, 
                <a class="myImg" href="javascript:void(0)" onclick="show(6)">6</a>, 
                <a class="myImg" href="javascript:void(0)" onclick="show(7)">7</a>)
            </div>

            <div class="content"><span class="date"> July 2023</span>
            Congratulations to M.-J. Chen, Y.-H. Chen, and W.-H. Peng on having one TCSVT 2023 paper "B-CANF: Adaptive 
            B-frame Coding with Conditional Augmented Normalizing Flows" accepted for publication. 
            </div>

            <div class="content"><span class="date"> July 2023</span>
            Congratulations to Y.-H. Chen*, S.-C. Chen*, Y.-H. Chen, Y.-Y. Lin, and W.-H. Peng on having one ICCV 2023 paper "MoTIF: Learning Motion 
            Trajectories with Local Implicit Neural Functions for Continuous Space-Time Video Super-Resolution" 
            accepted for publication. 
            </div>

            <div class="content"><span class="date"> July 2023</span>
            Congratulations to Y.-H. Chen, Y.-C. Weng, C.-H. Kao, C. Chien, W.-C. Chiu, and W.-H. Peng on having one ICCV 2023 paper "TransTIC: Transferring Transformer-based 
            Image Compression from Human Visualization to Machine Perception" accepted for publication. 
            </div>

            <div class="content"><span class="date">May 2023</span> 
                Prof. Wen-Hsiao Peng gave an <a href="https://ieee-cas.org/">
                IEEE CASS</a> Distinguished Lecturer talk (sponsored jointly by <a href="http://www.apsipa.org/">APSIPA</a>) on <a
                href="./pages/research/IEEE_CAS_DL_May_2023.pdf">End-to-End 
                Learned Image and Video Compression: Design, Implementation, and Computer Vision Applications
                </a> at Santa Clara University, USA.
            </div>
            
            <div class="content"><span class="date">May 2023</span> Congratulations to M.-J. Cheng, H.-S. Xie,
                C. Chien, W.-H. Peng, and H.-M. Hang on winning the IEEE ISCAS 2023
                Grand Challenge on Neural Network-based Video Coding <a
                    href="./pages/photos/ISCAS2023.png">Top Creativity Award.</a>
            </div>
            
            <!--<div class="content"><span class="date"> April 2023</span>
            A tutorial talk on "End-to-End Learned Image and Video Compression: Design, Implementation,
            and Computer Vision Applications" will be given by Prof. Wen-Hsiao Peng at ICCV 2023 in Paris.
            </div>-->

            <div class="content"><span class="date"> March 2023</span>
                [Invited Talk] Signal Processing at Institut für Informationsverarbeitung
                <br>
                <b>Speaker</b>: Prof Jörn Ostermann (Leibniz Universität Hannover) 
                <br>
                <b>Time</b>: 3/23 (Thursday) 10:30 - 11:30<br>
                <b>Venue</b>: 國立陽明交通大學 工程三館345教室<br>
                <b>Information</b>: <a
                    href="./pages/research/2023-03-23演講_海報A1.pdf">More..</a>
            </div>

            <div class="content"><span class="date"> March 2023</span>
                Congratulations to D. Alexandre, H.-M. Hang, and W.-H. Peng on having one CVPR 2023 paper "Hierarchical B-frame Video Compression Using Two-layer CANF without Motion Coding" accepted for publication. 
            </div>
            
            
            <div class="content"><span class="date"> December 2022</span>
                [Invited Talk] Learning to synthesize Image and Video Content
                <br>
                <b>Speaker</b>: Prof Ming-Hsuan Yang (University of California at Merced) 
                <br>
                <b>Date</b>: December 15 (Thursday), 2022 <br>
                <b>Time</b>: 13:20 - 16:20  Taiwan (UTC+8)<br>
                <b>Title</b>: Learning to synthesize Image and Video Content<br>
                <b>Teams</b>: https://reurl.cc/nZoa56
            </div>
            <div class="content"><span class="date"> December 2022</span>
                [Invited Talk] Learning to Reconstruct Non-rigid 3D Objects from Videos
                <br>
                <b>Speaker</b>: Prof Ming-Hsuan Yang (University of California at Merced) 
                <br>
                <b>Date</b>: December 14 (Wednesday), 2022 <br>
                <b>Time</b>: 13:20 - 16:20  Taiwan (UTC+8)<br>
                <b>Title</b>: Learning to Reconstruct Non-rigid 3D Objects from Videos<br>
                <b>Teams</b>: https://reurl.cc/nZoa56
            </div>

            <div class="content"><span class="date"> December 2022</span>
                Prof. Wen-Hsiao Peng organized a special session “Towards Practical Learning-based
                Image and Video Coding” at Picture Coding Symposium (PCS) 2022.
            </div>
            
            <div class="content"><span class="date">November 2022</span> We are recruiting highly self-motivated
                students to join our lab! Please contact Julie (<a
                    href="mailto:yhchen12101@gmail.com">Email</a>) for further details! 
                    This <a href="./pages/research/MAPL.pdf"> pdf </a> is a brief introduction about our research. 
                    <a href="./pages/joinus.html"> More.. </a> </div> 

            <div class="content"><span class="date"> November 2022</span>
                [Talk] APSIPA Forum on Intelligent Low-Complexity, Low-Power Visual Signal Processing Systems
                <br>
                <b>Speakers</b>: Prof. Wen-Hsiao Peng (NYCU, Taiwan); Prof. Heming Sun (Waseda Univ., Japan);
                <br>
                Dr. Christian Herglotz (FAU, Germany) <br>
                <b>Date</b>: December 1 (Thursday), 2022 <br>
                <b>Time</b>: 15:30 - 16:30 Taiwan (UTC+8); 08:30 - 09:30 Germany (UTC+1) <br>
                <b>Schedule</b>: <br>
                15:30 - 15:33 Opening Remarks <br>
                15:33 - 15:50 Towards Practical Learned Image and Video Compression by Prof. Wen-Hsiao Peng <br>
                15:50 - 16:10 Real-time Learned Image Codec on FPGA by Prof. Heming Sun <br>
                16:10 - 16:30 Energy Optimizations in Client-Side Video Streaming by Dr. Christian Herglotz <br>
                <b>Join Zoom Meeting</b> <a href="https://bit.ly/3OzaioQ">https://bit.ly/3OzaioQ</a> <br>
                <b>Meeting ID</b> 842 6724 0336 <br>
                <b>Passcode</b> 830434 <br>
                <b>Information</b>: <a
                    href="./pages/research/APSIPA_Forum_ILCLP-VSP-Fnl.pdf">More..</a>
            </div>
            <div class="content"><span class="date"> November 2022</span>
                [Invited Talk] Video Coding for Machines - A review <br>
                <b>Speaker</b>: Prof. MAREK DOMAŃSKI <br>
                <b>Time</b>: 11/14 13:20-14:10 <br>
                <b>Information</b>: <a
                    href="./pages/research/2022-11-14-Domanski_talk.pdf">More..</a>
            </div>

            <div class="content"><span class="date"> November 2022</span>
                [Invited Talk] Advanced Adaptive Arithmetic Coding in Video Compression<br>
                <b>Speaker</b>: Dr. DAMIAN KARWOWSKI <br>
                <b>Time</b>: 11/14 14:30-15:30 <br>
                <b>Information</b>: <a
                    href="./pages/research/2022-11-14-Domanski_talk.pdf">More..</a>
            </div>


            <div class="content"><span class="date">November 2022</span> 恭喜彭文孝教授榮獲111年國家實驗研究院研發服務平台<a
                    href="./pages/photos/TWCC_research_award.jpg">「亮點成果獎優等」</a><a
                    href="https://www.nchc.org.tw/Message/MessageView?id=3816&menutype=0&sitemenuid=5&mid=46">
                    More..</a></div>

            <div class="content"><span class="date">October 2022</span> 恭喜彭文孝教授榮獲中國電機工程學會111年「傑出電機工程教授獎」。 </div>

            <div class="content"><span class="date">October 2022</span> Congratulations to S.-P. Lee, N. P.
                Kini, W.-H. Peng, C.-W. Ma, and J.-N. Hwang on having one WACV 2023 paper "HuPR: A Benchmark for
                Human Pose Estimation Using Millimeter Wave Radar" accepted for publication.
                <a href="./../HuPR/">
                    Project Page.</a>
            </div>
            <div class="content"><span class="date">September 2022</span> Congratulations to C.-H. Lin, Y.-H.
                Chen, and W.-H. Peng on having one PCS 2022 paper "Content-adaptive Motion Rate Adaption for
                Learned Video Compression" accepted for publication
                <a href="./pages/research/PCS_2022.pdf">PDF</a>
                <a href="./../PCS/"> Project Page</a>
            </div>
            <div class="content"><span class="date">September 2022</span> Congratulations to Y.-H. Ho, C.-H.
                Kao, W.-H. Peng, and P.-C. Hsieh on having one VCIP 2022 paper "Neural Frank-Wolfe Policy
                Optimization for Region-of-Interest
                Intra-Frame Coding with HEVC/H.265"
                accepted for publication <a
                    href="https://arxiv.org/abs/2209.13210?fbclid=IwAR2HmZIswzYLydMyulMhLfDJH7aQI4y27CEsDihcbm0ZNerlfWKgqF6eLpc">PDF
                </a>
                <a
                    href="https://joek6279.github.io/NFWPO-Coding/?fbclid=IwAR3cBv1yjjQ_iF57Hs-aSmwKAHpQPJLryqA9FYVg8k8FkkH_AQd6GkS18lw">
                    Project Page</a>
                </a>
            </div>
            <div class="content"><span class="date">September 2022</span> Prof. Wen-Hsiao Peng gave a talk on <a
                    href="./pages/research/CASS_DL_Talk_2022Sep.pdf">Advances in
                    Design and Implementation of End-to-End Learned Image and Video Compression at CASS.</a>
            </div>
            <div class="content"><span class="date">August 2022</span> Prof. Wen-Hsiao Peng gave a tutorial talk
                on <a
                    href="https://www.linkedin.com/feed/update/urn:li:share:6963487445304635392?utm_source=linkedin_share&utm_medium=member_ios_link_share&utm_content=post&fbclid=IwAR04l_IWOxi87YOz_wIFdx0CnV_Pm0pf43XuMIrx8u4qoDKAm53RK2H1m9M">Recent
                    Advances in Learning-based Image and Video Coding at SBCCI 2022.</a> </div>
            <div class="content"><span class="date">August 2022</span> Congratulations to Hector (Yung-Han Ho)
                on winning the <a href="./pages/photos/Hector_paper_award.png">
                    15th IPPR outstanding Ph.D. thesis award.</a> </div>
            <div class="content"><span class="date">July 2022</span> Congratulations to Yung-Han Ho, Chih-Peng
                Chang, Peng-Yu Chen, Alessandro Gnutti, Wen-Hsiao Peng on having one ECCV 2022 paper (CANFVC:
                Conditional Augmented Normalizing Flows for Video Compression) accepted for publication <a
                    href="https://arxiv.org/abs/2207.05315?context=eess&fbclid=IwAR09I1p3MZ10Du1-9AK_lC6EKS2bIb2yWvR5nbutnxG7rf2xy_6Pzc6NjYg">pdf
                </a><a href="https://github.com/NYCU-MAPL/CANF-VC">code.</a></div>
            <div class="content"><span class="date">June 2022</span> Congratulations to Y.-H. Ho, C.-H. Lin,
                P.-Y. Chen, M.-J. Chen, C.-P Chang, W.-H. Peng, and H.-M. Hang on winning the IEEE ISCAS 2022
                Grand Challenge on Neural Network-based Video Coding Top performance Award in the End-to-end <a
                    href="./pages/photos/ISCAS2022.jpg">Track.</a></div>
            <div class="content"><span class="date">April 2022</span> Congratulations to Hector (Yung-Han Ho) on
                recieving his Ph.D degree.</div>
            <div class="content"><span class="date">March 2022</span> We are recruiting highly self-motivated
                students to join our lab! Please contact Julie (<a href="mailto:yhchen12101@gmail.com">Email</a>) 
                for further details! And you can check our research content <a href="./pages/research/MAPL.pdf">PDF</a>
            </div>
            <div class="content"><span class="date">December 2021</span> Prof. Wen-Hisao Peng was selected as an
                IEEE Circuists and System Society Distinguished Lecturer for 2022-2023. </div>
            <div class="content"><span class="date">November 2021</span> We are recruiting highly self-motivated
                students to join our lab! Please contact Julie (<a
                    href="mailto:yhchen12101@gmail.com">Email</a>) for further details! </div>
            <div class="content"><span class="date">December 2021</span> Prof. Wen-Hsiao Peng gave a talk on
                Learned Image and Video Compression Using Augmented Normalizing Flows at Leibniz Universität
                Hannover, Germany</div>
            <div class="content"><span class="date">December 2021</span> Prof. Wen-Hsiao Peng gave a talk on
                Learned Image and Video Compression Using Augmented Normalizing Flows at FAU Erlangen-Nürnberg,
                Germany</div>
            <div class="content"><span class="date">November 2021</span> Our learning-based compression
                techniques are reported by DIGITIMES! <a
                    href="https://l.messenger.com/l.php?u=https%3A%2F%2Fwww.digitimes.com.tw%2Fiot%2Farticle.asp%3Fcat%3D130%26cat1%3D40%26cat2%3D140%26id%3D0000622321_9C04NJCP1NG7J12RYJJZB&h=AT2pMWMoLfeuGSLI-uqnGrAFHJcyp280VKwe1gwKoOdau-c_yH96qjXWkRIO-AXbRhVaKgeuXwakCaKZkEH1TyftB0b0miCzwfls6jtxOsCb_P_Z5pOapQtIECsBxs_IjA7ZvczGCFeIT_s">Link</a>
            </div>
            <div class="content"><span class="date">November 2021</span> Congratulations to Hector (Yung-Han Ho)
                and James (Chih-Chun Chan) on having one OJCAS 2021 paper (ANFIC: Image Compression Using
                Augmented Normalizing Flows) accepted for publication. (<a
                    href="https://arxiv.org/pdf/2107.08470.pdf">PDF</a>)</div>
            <div class="content"><span class="date">May 2021</span> Prof. Wen-Hsiao Peng (and Prof. Heming Sun
                from Waseda Univ.) gave a tutorial talk on Advances in Design and Implementation of End-to-End
                Learned Image and Video Compression at ISCAS 2021. </div>
            <div class="content"><span class="date">April 2021</span> Prof. Wen-Hsiao Peng served as a panelist
                for the APSIPA panel on the "Future of Video Coding". <a href="https://bit.ly/3eruXuD">Link</a>;
                video recording: <a href="https://bit.ly/3b9dRQ1">April 24</a></div>
            <div class="content"><span class="date">Janurary 2021</span> Congratulations to Stanley (Yan-Cheng
                Huang), Julie (Yi-Hsin Chen), Cheng-You Lu, Hui-Po Wang on having one CVPR 2021 paper (Video
                Rescaling Networks with Joint Optimization Strategies for Downscaling and Upscaling) accepted
                for publication. (<a
                    href="https://openaccess.thecvf.com/content/CVPR2021/papers/Huang_Video_Rescaling_Networks_With_Joint_Optimization_Strategies_for_Downscaling_and_CVPR_2021_paper.pdf">PDF</a>)
            </div>
            <div class="content"><span class="date">Janurary 2021</span> IEEE VCIP is calling for papers (<a
                    href="https://kenzler-conferences.de/wp-content/uploads/2021/02/VCIP2021-Call-for-papers1.1.pdf">PDF</a>),
                tutorials, and special sessions. Visit the conference website for more details: </span><a
                    href="https://www.vcip2021.org/">here</a></div>
            <div class="content"><span class="date">December 2020</span> Prof. Wen-Hsiao Peng gave a tutorial
                talk on Recent Advances in End-to-End Learned Image and Video Compression at VCIP 2020.</div>
            <div class="content"><span class="date">October 2020</span> Prof. Wen-Hsiao Peng gave a DPVSA DL
                talk on Application of reinforcement learning to video encoder control and video prediction at
                Pelotas, Rio Grande do Sul, Brazil (<a
                    href="https://wp.ufpel.edu.br/dpvsa/wen-hsiao-peng/">online</a>).</div>
            <div class="content">
                <span class="date">July 2020</span> [AI Meetup] Learning Based Image and Video Compression.
                <div><span style="font-weight:bolder">主辦單位:</span> 國立交通大學資工系(AI專案計畫-杭學鳴教授&彭文孝教授團隊)</div>
                <div><span style="font-weight:bolder">協辦單位:</span> 科技部人工智慧普適研究中心</div>
                <div><span style="font-weight:bolder">Time: </span>11:00 - 12:00, Friday, 10 July, 2020</div>
                <div><span style="font-weight:bolder">Venue: </span>交通大學光復校區工程三館122教室</div>
                <div><span style="font-weight:bolder">Information: </span><a
                        href="https://forms.gle/qCbkSiDn1WowPXRZ8">here</a></div>
            </div>
            <div class="content"><span class="date">June 2020</span> Prof. Wen-Hsiao Peng served as Co-organizer
                of the IEEE TCSVT Special Section on Learning-based Image and Video Compression.</div>
            <div class="content"><span class="date">January 2020</span> Prof. Wen-Hsiao Peng was appointed as
                Associate Editor-in-Chief of Digital Communications for IEEE Journal on Emerging and Selected
                Topics in Circuits and Systems (JETCAS).</div>
            <div class="content">
                <span class="date">September 2019</span> [Invited Talk] Beyond end-to-end learning: Dialog system, sentence generation, and conversation analysis for automatic mental disorder diagnosis.
                <div><span style="font-weight:bolder">Honorary Speaker:</span> Prof. Yoshinobu Kano</div>
                <div><span style="font-weight:bolder">Time: </span>14:00 - 15:00, Monday, 30 September, 2019</div>
                <div><span style="font-weight:bolder">Venue: </span>National Chiao Tung University, EC321 (交通大學工程三館 EC321)</div>
                <div><span style="font-weight:bolder">Information: </span><a href="./../../../sample/20190930_Yoshinobu_Talk.pdf">here</a></div>
			</div>
            <div class="content"><span class="date">July 2019</span> Congratulations to our student Hui-Po Wang on being admitted into the internship program with Max Planck Institute, Germany.</div>
            <div class="content"><span class="date">March 2019</span> Prof. Wen-Hsiao Peng gave an APSIPA DL talk on Reinforcement Learning for Video Encoder Control and Video Prediction at Sungkyunkwan Univ., Suwon, South Korea.</div>
            <div class="content"><span class="date">February 2019</span> Prof. Wen-Hsiao Peng was appointed as Associate Editor of IEEE Transactions on Circuits and Systems for Video Technology (TCSVT).</div>
            <div class="content"><span class="date">November 2018</span> Prof. Wen-Hsiao Peng gave an APSIPA DL talk on Reinforcement Learning for HEVC/H.265 Video Rate Control at Tongji Univ., Shanghai, China.</div>
            <div class="content"><span class="date">November 2018</span> Our lab member Hui-Po Wang received the Best Paper Award (Runner-up) at APSIPA ASC 2018 for his work on Learning Priors for Adversarial Autoencoders.</div>
            <div class="content">
                    <span class="date">August 2018</span> Prof. Wen-Hsiao Peng was elected as Secretary (Chair-Elect) of IEEE CASS VSPCTC
                    <div><span style="font-weight:bolder">Link: </span><a href="http://ieee-cas.org/community/technical-committees/visual-signal-processing-and-communications-technical-committee-vspc">VSPC</a></div>
            </div>
            <div class="content">
                <span class="date">March 2018</span> [Special Issue] Immersive Video Coding and Transmission
                <div><span style="font-weight:bolder">Guest Editors: </span>Mathias Wien, Jill Boyce, Thomas Stockhammer, and Wen-Hsiao Peng</div>
                <div><span style="font-weight:bolder">IEEE JETCAS: </span>March, 2019</div>
                <div><span style="font-weight:bolder">Call for Papers: </span><a href="./../../../sample/JETCAS-CFP-ImmersiveVideoCodingAndTransmission_r1.pdf">JETCAS</a></div>
            </div>
            <div class="content">
                <span class="date">February 2017</span> Prof. Wen-Hsiao Peng was elected as Senior Editorial Board Member of the IEEE Journal on Emerging and Selected Topics in Circuits and Systems (JETCAS)
                <div><span style="font-weight:bolder">Link: </span><a href="http://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=5503868">IEEE JETCAS</a></div>
            </div>
            <div class="content">
                <span class="date">February 2017</span> Prof. Wen-Hsiao Peng was elected as Distinguished Lecturer of the Asia-Pacific Signal and Information Processing Association (APSIPA)
                <div><span style="font-weight:bolder">Link: </span><a href="http://apsipa.org/edu.htm">APSIPA</a></div>
            </div>
            <div class="content"><span class="date">February 2017</span> Congratulations to our student Yan-Wei Chang on being admitted into the Student Exchange Program with RWTH Aachen University, Germany.</div>
            <div class="content"><span class="date">January 2017</span> Congratulations to our undergraduate student, Chi-Wei Hsiao (蕭棋薇) for receiving the 2016 WeTech Science, Technology, Engineering and Math (STEM) Scholarship.</div>
            <div class="content">
                <span class="date">February 2017</span> [Invited Talk] Identifying and modeling what to share for computer vision and machine learning
                <div><span style="font-weight:bolder">Honorary Speaker: </span>Dr. Wei-Lun (Harry) Chao</div>
                <div><span style="font-weight:bolder">Time: </span>10:10 - 11:10 am, Wednesday, 4 January, 2017</div>
                <div><span style="font-weight:bolder">Venue: </span>National Chiao Tung University, EC-015 (交通大學工程三館015室)</div>
                <div><span style="font-weight:bolder">Information: </span><a href="./../../../sample/poster-0104%20Dr.%20Wei-Lun%20Chao_V2.pdf">Info</a></div>
            </div>
            <a href="index.html" onclick=''>Recent news and events</a>
        </div>`;
    parent.append(newele);
	parent2.append(newele2);
}