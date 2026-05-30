function go_teaching(){
    var parent = $('#left_parent');
    var parent2 = $('#left_parent2');
    $('.left_ele').remove();
    var newele = `
        <div class="left_ele">
            Teaching
        </div>
    `;
    /*<div class="left_ele title_style">
        Teaching
    </div>*/
    var newele2 = `
        <div class="left_ele ele_container">
            <ul>
                <div class="content">
                    <li>
                        <div class="topic">
                            <div class="title">Deep Learning and Practice (IOC5184)</div>
                            <a href="#" onclick="go_lec_DLP();">Course Page</a>
                            <ul>
                                <li>Summer Semester 2020</li>
                                <li>Spring Semester 2020</li>
                                <li>Summer Semester 2019</li>
                                <li>Spring Semester 2019</li>
                            </ul>
                        </div>
                    </li>
                </div>
                <div class="content">
                    <li>
                        <div class="topic">
                            <div class="title">Matrix Method in Data Science (IDS5009)</div>
                            <a href="#" onclick="go_lec_MM();">Course Page</a>
                            <ul>
                                <li>Fall Semester 2019</li>
                            </ul>
                        </div>
                    </li>
                </div>
                <div class="content">
                    <li>
                        <div class="topic">
                            <div class="title">Video Compression (ILE5242)</div>
                            <ul>
                                <li><a href="#">Spring Semester 2020</a></li>
                                <li><a href="http://mapl.nctu.edu.tw/course/VC_2013/index.php">Spring Semester 2013</a></li>
                                <li><a href="http://mapl.nctu.edu.tw/course/VC_2012/index.php">Spring Semester 2012</a></li>
                                <li><a href="http://mapl.nctu.edu.tw/course/VC_2009/index.php">Spring Semester 2009</a></li>
                                <li><a href="http://mapl.nctu.edu.tw/course/VC_2008/index.php">Spring Semester 2008</a></li>
                            </ul>
                        </div>
                    </li>
                </div>
                <div class="content">
                    <li>
                        <div class="topic">
                            <div class="title">Linear Algebra (DCP2354)</div>
                            <ul>
                                <li><a href="http://mapl.nctu.edu.tw/course/LA_2017/index.php">Fall Semester 2017</a></li>
                                <li><a href="http://mapl.nctu.edu.tw/course/LA_2016/index.php">Fall Semester 2016</a></li>
                                <li><a href="http://mapl.nctu.edu.tw/course/LA_2013/index.php">Fall Semester 2013</a></li>
                                <li><a href="http://mapl.nctu.edu.tw/course/LA_2012/index.php">Fall Semester 2012</a></li>
                                <li><a href="http://mapl.nctu.edu.tw/course/LA_2010/index.php">Fall Semester 2010</a></li>
                                <li><a href="http://mapl.nctu.edu.tw/course/LA_2008/index.php">Fall Semester 2008</a></li>
                            </ul>
                        </div>
                    </li>
                </div>
                <div class="content">
                    <li>
                        <div class="topic">
                            <div class="title">Stochastic Processes (IOC5127)</div>
                            <ul>
                                <li><a href="http://mapl.nctu.edu.tw/course/SP_2017/index.php">Fall Semester 2017</a></li>
                                <li><a href="http://mapl.nctu.edu.tw/course/SP_2014/index.php">Spring Semester 2014</a></li>
                                <li><a href="http://mapl.nctu.edu.tw/course/SP_2012/index.php">Fall Semester 2012</a></li>
                                <li><a href="http://mapl.nctu.edu.tw/course/SP_2009/index.php">Fall Semester 2009</a></li>
                            </ul>
                        </div>
                    </li>
                </div>
                <div class="content">
                    <li>
                        <div class="topic">
                            <div class="title">Probability Theroy (DCP3351)</div>
                            <ul>
                                <li><a href="http://mapl.nctu.edu.tw/course/Pro_2014/index.php">Fall Semester 2014</a></li>
                                <li><a href="http://mapl.nctu.edu.tw/course/Pro_2011/index.php">Spring Semester 2011</a></li>
                                <li><a href="http://mapl.nctu.edu.tw/course/Pro_2010/index.php">Fall Semester 2010</a></li>
                                <li><a href="http://mapl.nctu.edu.tw/course/Pro_2009/index.php">Spring Semester 2009</a></li>
                            </ul>
                        </div>
                    </li>
                </div>
            </ul>
        </div>
    `;
    parent.append(newele);
    parent2.append(newele2);
}

/*=================================================
Add materials for deep learning and practice
=================================================*/
function go_lec_DLP(){
	var parent = $('#left_parent');
	var parent2 = $('#left_parent2');
	$('.left_ele').remove();
	var newele = `
	<div class="left_ele">
	</div>`;
	var newele2 = `
		<div class="left_ele ele_container">
            <div class="topic">
                <div class="title">Course Description</div>
            </div>
            <div class="content">
                The main goal of this course is to make students understand the maths of deep learning techniques,
                the latest applications of deep learning,
                and familiarize with deep learning tools, PyTorch, by working on hands-on labs.
                Students are required to present papers and develop final projects which will be presented in a on site workshop.
			</div>
            <div class="title">Spring Semester 2020 - Selected Projects</div>
            <table class="research_table">
                <tbody>
                    <tr>
                        <td class="research_td">
                            <iframe class="video" src="https://youtube.com/embed/fNTqAqTCVcA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            <div class="research_title">Applying tricks from Morphnet on FlowNet</div>
                            <div class="research_author">楊政道, 施囿維, 劉姿利</div>
                            <div class="link"><a href="#">Poster</a></div>
                            <button class="button" onclick="ShowAbstract('project_2020_1');">Abstract</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="abstract" id='project_2020_1'>
                                FlowNet is a model used to predict the optical flow.
								However, FlowNet is really large and requires highly computational cost.
								We want to make it more power efficient.
								We find that the tricks used in the MorphNet can find out which parameters are more
								important to the network and prune out the unimportant parameters, resulting in a
								smaller network architecture.
								After we apply the tricks on the FlowNet, the number of channels in convolution
								layers reduce to 46% (25042 to 13338), and the size reduces from 620M to 185M,
								with the accuracy approximately the same.
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="link">
                                <a href="https://timetable.nctu.edu.tw/?r=main/crsoutline&Acy=108&Sem=2&CrsNo=5253&lang=zh-tw">Syllabus</a> |
                                <a href="https://youtu.be/fNTqAqTCVcA">Project Video</a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="title">Spring Semester 2019 - Selected Projects</div>
            <table class="research_table">
                <tbody>
                    <tr>
                        <td class="research_td">
                            <iframe class="video" src="https://youtube.com/embed/KYVma8KVT_k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            <div class="research_title">Contextual Attention Inpainting Network with Non-local Blocks</div>
                            <div class="research_author">劉嘉豪, 朱蝶</div>
                            <div class="link"><a href="#">Poster</a></div>
                            <button class="button" onclick="ShowAbstract('project_2019_1');">Abstract</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="abstract" id='project_2019_1'>
                                Contextual attention module (CAM) and non-local blocks
                                are proposed to solve the ineffectiveness of convolutional
                                neural networks in explicitly borrowing or copying
                                information from distant spatial locations. Motivated by
                                these two methods, we add the non-local blocks to the
                                contextual attention network in [1], and the new
                                architecture improve the accuracy.
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="link">
                                <a href="https://timetable.nctu.edu.tw/?r=main/crsoutline&Acy=108&Sem=2&CrsNo=5253&lang=zh-tw">Syllabus</a> |
                                <a href="https://www.youtube.com/watch?v=O0ijvhG1Xoo&list=PLZAKTu7XAqHUukdYlwdWbZ0yj-q9TAWPA">Project Video</a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="title">Summer Semester 2018 - Selected Projects</div>
            <table class="research_table">
                <tbody>
                    <tr>
                        <td class="research_td">
                            <iframe class="video" src="https://youtube.com/embed/cSxyAMotcjo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            <div class="research_title">Fast Semantic Segmentation on Video Using Motion Vector-Based Feature Interpolation</div>
                            <div class="research_author">陳詒歆, 陳梅香</div>
                            <div class="link"><a href="#">Poster</a></div>
                            <button class="button" onclick="ShowAbstract('project_summer_2019_1');">Abstract</button>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="abstract" id="project_summer_2019_1">
                                Model optimized for challenging, dence prediction tasks such as semantic segmentation entail significant
                                inference costs and are slow to run on each frame in a video. However, there is substantial opportunity to reuse
                                computation from previous frame because of its similarity. This paper has two main contributions:
                                • To use motion vector maps instead of optical flow maps for cheaply propagate feature from frame to frame.
                                • To use feature interpolation schemes that warps and fuses the features of enclosing keyframes to generate
                                accurate feature estimates for intermediate frames.
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="link">
                                <a href="https://timetable.nctu.edu.tw/?r=main/crsoutline&Acy=108&Sem=2&CrsNo=5253&lang=zh-tw">Syllabus</a> |
                                <a href="https://www.youtube.com/watch?v=O0ijvhG1Xoo&list=PLZAKTu7XAqHUukdYlwdWbZ0yj-q9TAWPA">Project Video</a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="title">Spring Semester 2018 - Selected Projects</div>
            <table class="research_table">
                <tbody>
                    <tr>
                        <td class="research_td">
                            <iframe class="video" src="https://www.youtube.com/embed/CGPo546M6d8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            <div class="research_title">Learnt Image Compressor</div>
                            <div class="research_author">Chih-Peng Chang</div>
                            <div class="link"><a href="#">Poster</a></div>
                            <button class="button" onclick="ShowAbstract('project_2018_1');">Abstract</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="abstract" id="project_2018_1">
                                We developed a lossy image compression
                                system using the deep-learning autoencoder
                                structure. Our autoencoder adopts the residual
                                neural net blocks with skip connections to
                                reduce the correlation among image pixels and
                                condense the input image into a set of feature
                                maps, a compact representation of the original
                                image. Our bit allocation and bitrate control
                                are implemented by using the importance
                                maps and quantizer. The importance maps are
                                generated by a separate neural net in the
                                encoder. Our aim is to produce reconstructed
                                images with good subjective quality at low bit
                                rates.
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="research_td">
                            <iframe class="video" src="https://www.youtube.com/embed/Gbs1KCEphDI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>	                        
                            <div class="research_title">Simple Does It: Weakly Supervised Instance and Semantic Segmentation with Tensorflow</div>
                            <div class="research_author">呂承祐, 黃宇晟</div>
                            <div class="link"><a href="#">Poster</a></div>
                            <button class="button" onclick="ShowAbstract('project_2018_2');">Abstract</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="abstract" id="project_2018_2">
                            Generating labels for fully supervised
                            semantic segmentation is expensive;
                            Therefore, in [1] which using Bounding
                            Box, a kind of cheap-to-generate label,
                            in replace of expensive semantic
                            segmentation.
                            • In order to generate a more precise
                            label, the Bounding Box is processed
                            with the traditional computer vision
                            method, GrabCut.
                            • After getting the more precise label,
                            now the semantic segmentation can be
                            solved by fully supervised learning.
                            • At last, refining the semantic
                            segmentation with Dense CRF.
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="link">
                                <a href="https://timetable.nctu.edu.tw/?r=main/crsoutline&Acy=108&Sem=2&CrsNo=5253&lang=zh-tw">Syllabus</a> |
                                <a href="https://www.youtube.com/watch?v=QgoxtGi-trU&list=PLZAKTu7XAqHWY1J522ldYk29DjzdGA8jh">Project Video</a>
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
/*=================================================
Add materials for Matrix Method
=================================================*/
function go_lec_MM(){
	var parent = $('#left_parent');
	var parent2 = $('#left_parent2');
	$('.left_ele').remove();
	var newele = `
	<div class="left_ele">
	</div>`;
	var newele2 = `
		<div class="left_ele ele_container">
            <div class="topic">
                <div class="title">Course Description</div>
            </div>
            <div class="content">
                This course extends matrix methods in Linear Algebra to cover their applications to data science, 
                including data analysis, signal processing, and machine learning. 
                It shall equip students with the required matrix methods on which data science depends. 
                TO TEACH TO LEARN TWICE policy - each group of students should take care of half-hour recitation sessions and be
                the audience of the other groups' recitation. Students should prepare taught materials to help students
                reviewing class materials in recitation sessions.
            </div>
            <div class="title">Fall Semester 2019 - Recitation Sessions</div>
            <table class="research_table">
                <tbody>
                    <tr>
                        <td class="research_td">
                            <img class="research_img" src="teaching/fall_2019_1.png"></img>
                            <div class="research_title">The insight of QR factorization</div>
                            <div class="research_author">Shih-Po Lee, Chih-Peng Chang</div>
                            <div class="link"><a href="teaching/[Group1]0756051_0856057.pptx">Slides</a></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="research_td">
                            <img class="research_img" src="teaching/fall_2019_2.png"></img>
                            <div class="research_title">Sherman-Morrison-Woodbury formula</div>
                            <div class="research_author">梁允, 翁英傑</div>
                            <div class="link"><a href="teaching/[Group16]0856717_0516069.pdf">Slides</a></div>
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
Add materials for Video compression
=================================================*/
function go_lec_VC(){
	var parent = $('#left_parent');
	var parent2 = $('#left_parent2');
	$('.left_ele').remove();
	var newele = `
	<div class="left_elee">
	</div>`;
	
	var newele2 = `
		<div class="left_ele" style="text-align:center;margin-top:3%;">
		  <img  src="/figures/unavailable.png" alt="error" style="width:15vw;height:15vw;border:0;">
		</div>
	`;
	parent.append(newele);
	parent2.append(newele2);
}