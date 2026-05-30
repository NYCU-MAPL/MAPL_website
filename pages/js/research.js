/*=================================================
Change the variables below to modify the content
=================================================*/

/*You should use embedded url from youtube*/
homepage_youtube = "https://www.youtube.com/embed/X3WpaQzZBfE"

RLencoderimg = "encoder_control.png"
RLencoderimg2 = "encoder_control2.png"
Videopredimg = "Video_Prediction.png"
Videopredimg2 = "Video_Prediction2.png"
Compressionimg = "Deep_image.png"
Compressionimg2 = "Deep_image2.png"
function go_research(){
    var parent = $('#left_parent');
    var parent2 = $('#left_parent2');
    $('.left_ele').remove();
    var newele = `
    <div class="left_ele title_style">
        Research
    </div>`;
    
    var newele2 = `
        <div class="left_ele ele_container">
            <div class="topic">
                <span class="title">Research Content</span>
            </div>
            <div style="font-size:15px;font-weight:800;background-color:#FAF4FF">
                <ul>
                    <li>
                        Image/Video Compression
                        <ul>
                            <li>
                                <a href="#dvp">Deep Video Prediction</a>
                            </li>
                            <li>
                                <a href="#lbic">Learning-based Image Compression</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        Semantic Segmentation
                        <ul>
                            <li>
                                <a href="#dass">Domain Adaptation</a>
                            </li>
                            <li>
                                <a href="#vss">Video Semantic Segmentation</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Incremental Learning</a>
                    </li>
                    <li>
                        <a href="#">AI Drone</a>
                    </li>
                </ul>
            </div>
            <h1 id="dvp"></h1>
            <div class="topic">
                <span class="title">Deep Video Prediction</span>
            </div>
            <table class="research_table">
                <tbody>
                    <tr>
                        <td class="research_td">
                            <img class="research_img" src="research/compression/Videopred/` + Videopredimg + `"></img>
                            <div class="research_title">SME-Net: Sparse Motion Estimation for Parametric Video Prediction through Reinforcement Learning</div>
                            <div class="research_author">Yung-Han Ho, Chuan-Yuan Cho, Wen-Hsiao Peng, Guo-Lun Jin</div>
                            <div class="research_from">IEEE International Conference on Computer Vision (ICCV), Oct. 2019.</div>
                            <div class="link"><a href="https://openaccess.thecvf.com/content_ICCV_2019/papers/Ho_SME-Net_Sparse_Motion_Estimation_for_Parametric_Video_Prediction_Through_Reinforcement_ICCV_2019_paper.pdf">PDF</a> | <a href="#">Github</a></div>
                            <button class="button" onclick="ShowAbstract('research_DVP_1');">Abstract</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                           <div class="abstract" id="research_DVP_1">
                            This paper leverages a classic prediction technique,
                            known as parametric overlapped block motion compensation (POBMC), in a reinforcement learning framework for
                            video prediction. Learning-based prediction methods with
                            explicit motion models often suffer from having to estimate
                            large numbers of motion parameters with artificial regularization. Inspired by the success of sparse motion-based
                            prediction for video compression, we propose a parametric video prediction on a sparse motion field composed of
                            few critical pixels and their motion vectors. The prediction
                            is achieved by gradually refining the estimate of a future
                            frame in iterative, discrete steps. Along the way, the identification of critical pixels and their motion estimation are addressed by two neural networks trained under a reinforcement learning setting. Our model achieves the state-of-theart performance on CaltchPed, UCF101 and CIF datasets
                            in one-step and multi-step prediction tests. It shows good
                            generalization results and is able to learn well on small
                            training data.
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="research_td">
                            <img class="research_img" src="research/compression/Videopred/` + Videopredimg2 + `"></img>
                            <div class="research_title">Deep Video Prediction Through Sparse Motion Regularization</div>
                            <div class="research_author">Yung-Han Ho, Chih Chun Chan, Wen-Hsiao Peng</div>
                            <div class="research_from">IEEE International Conference on Image Processing (ICIP), Oct. 2020.</div>
                            <div class="link"><a href="">PDF</a> | <a href="#">Github</a></div>
                            <button class="button" onclick="ShowAbstract('research_DVP_2');">Abstract</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                           <div class="abstract" id="research_DVP_2">
                            This paper leverages a classic prediction technique,
                            known as parametric overlapped block motion compensation (POBMC), in a reinforcement learning framework for
                            video prediction. Learning-based prediction methods with
                            explicit motion models often suffer from having to estimate
                            large numbers of motion parameters with artificial regularization. Inspired by the success of sparse motion-based
                            prediction for video compression, we propose a parametric video prediction on a sparse motion field composed of
                            few critical pixels and their motion vectors. The prediction
                            is achieved by gradually refining the estimate of a future
                            frame in iterative, discrete steps. Along the way, the identification of critical pixels and their motion estimation are addressed by two neural networks trained under a reinforcement learning setting. Our model achieves the state-of-theart performance on CaltchPed, UCF101 and CIF datasets
                            in one-step and multi-step prediction tests. It shows good
                            generalization results and is able to learn well on small
                            training data 
                           </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h1 id="lbic"></h1>
            <div class="topic">
                <span class="title">Learning-based Image Compression</span>
            </div>
            <table class="research_table">
                <tbody>
                    <tr>
                        <td class="research_td">
                            <img class="research_img" src="research/compression/Compression/` + Compressionimg + `"></img>
                            <div class="research_title">An Autoencoder-based Image Compressor with Principle Component Analysis and Soft-Bit Rate Estimation</div>
                            <div class="research_author">Chih-Peng Chang, David Alexandr, Wen-Hsiao Peng, Hsueh-Ming Hang</div>
                            <div class="research_from">IEEE Conference on Computer Vision and Pattern Recognition (CVPR) Workshops, Jun. 2019.</div>
                            <div class="link"><a href="https://arxiv.org/abs/1902.07385">PDF</a> | <a href="#">Github</a></div>
                            <button class="button" onclick="ShowAbstract('research_IVC_1');">Abstract</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                           <div class="abstract" id="research_IVC_1">
                           We propose a lossy image compression system using the
                           deep-learning autoencoder structure to participate in the
                           Challenge on Learned Image Compression (CLIC) 2018.
                           Our autoencoder uses the residual blocks with skip connections to reduce the correlation among image pixels and condense the input image into a set of feature maps, a compact
                           representation of the original image. The bit allocation and
                           bitrate control are implemented by using the importance
                           maps and quantizer. The importance maps are generated
                           by a separate neural net in the encoder. The autoencoder
                           and the importance net are trained jointly based on minimizing a weighted sum of mean squared error, MS-SSIM,
                           and a rate estimate. Our aim is to produce reconstructed
                           images with good subjective quality subject to the 0.15 bitsper-pixel constraint. 
                           </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h1 id="dass"></h1>
            <div class="topic">
                <span class="title">Domain Adaptation for Semantic Segmentation</span>
            </div>
            
            <table class="research_table">
                <tbody>
                    <tr>
                        <td class="research_td">
                            <img class="research_img" src="research/segmentation/DA_1.jpg"></img>
                            <div class="research_title">All about Structure: Adapting Structural Information across Domains for Boosting Semantic Segmentation</div>
                            <div class="research_author">Wei-Lun Chang,  Hui-Po Wang, Wen-Hsiao Peng, Wei-Chen Chiu</div>
                            <div class="research_from">IEEE Computer Society Conference on Computer Vision and Pattern Recognition (CVPR), June 2019.</div>
                            <div class="link"><a href="https://arxiv.org/abs/1903.12212">PDF</a> | <a href="https://github.com/a514514772/DISE-Domain-Invariant-Structure-Extraction">Github</a> | <a href="https://a514514772.github.io/DISE-Domain-Invariant-Structure-Extraction/">Project Page</a></div>
                            <button class="button" onclick="ShowAbstract('research_DA_1');">Abstract</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                           <div class="abstract" id="research_DA_1">
                            In this paper we tackle the problem of unsupervised
                            domain adaptation for the task of semantic segmentation,
                            where we attempt to transfer the knowledge learned upon
                            synthetic datasets with ground-truth labels to real-world
                            images without any annotation. With the hypothesis that
                            the structural content of images is the most informative and
                            decisive factor to semantic segmentation and can be readily shared across domains, we propose a Domain Invariant
                            Structure Extraction (DISE) framework to disentangle images into domain-invariant structure and domain-specific
                            texture representations, which can further realize imagetranslation across domains and enable label transfer to improve segmentation performance. Extensive experiments
                            verify the effectiveness of our proposed DISE model and
                            demonstrate its superiority over several state-of-the-art approaches.
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <h1 id="vss"></h1>
            <div class="topic">
                <span class="title">Video Semantic Segmentation</span>
            </div>
            <table class="research_table">
                <tbody>
                    <tr>
                        <td class="research_td">
                            <img class="research_img" src="research/segmentation/VSS_1.png"></img>
                            <div class="research_title">Semantic Segmentation on Compressed Video Using Block Motion Compensation and Guided Inpainting</div>
                            <div class="research_author">Stefanie Tanujaya, Tieh Chu, Jia-Hao Liu, Wen-Hsiao Peng</div>
                            <div class="research_from">IEEE International Symposium on Circuits and Systems (ISCAS), Spain, Oct 2020.</div>
                            <div class="link"><a href="#">PDF</a> | <a href="#">Github</a></div>
                            <button class="button" onclick="ShowAbstract('research_VSS_1');">Abstract</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                           <div class="abstract" id="research_VSS_1">
                            This paper addresses the problem of fast semantic segmentation on compressed video. 
                            Unlike most prior works for video segmentation, which perform feature propagation based on optical flow estimates or sophisticated warping techniques, 
                            ours takes advantage of block motion vectors in the compressed bitstream to propagate the segmentation of a keyframe to subsequent non-keyframes. 
                            This approach, however, needs to respect the inter-frame prediction structure, 
                            which often suggests recursive, multi-step prediction with error propagation and accumulation in the temporal dimension. To tackle the issue, 
                            we refine the motion-compensated segmentation using inpainting. Our inpainting network incorporates guided non-local attention for long-range reference and pixel-adaptive convolution for ensuring the local coherence of the segmentation. 
                            A fusion step then follows to combine both the motion-compensated and inpainted segmentations. 
                            Experimental results show that our method outperforms the state-of-the-art baselines in terms of segmentation accuracy. 
                            Moreover, it introduces the least amount of network parameters and multiply-add operations for non-keyframe segmentation. 
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
Add materials of Deep image/video compression here
=================================================*/
function go_IVC(){
	var parent = $('#left_parent');
	var parent2 = $('#left_parent2');
	$('.left_ele').remove();
	var newele = `
	<div class="left_ele title_style">
		Image/Video Compression
	</div>`;
	
	var newele2 = `
		<div class="left_ele ele_container">  
            <div class="topic">
                <img class="title_num" src='figures/1.png'><img>
                Deep Video Prediction
            </div>
            <table class="research_table">
                <tbody>
                    <tr>
                        <td class="research_td">
                            <img class="research_img" src="research/compression/Videopred/` + Videopredimg + `"></img>
                            <div class="research_title">SME-Net: Sparse Motion Estimation for Parametric Video Prediction through Reinforcement Learning</div>
                            <div class="research_author">Yung-Han Ho, Chuan-Yuan Cho, Wen-Hsiao Peng, Guo-Lun Jin</div>
                            <div class="research_from">IEEE International Conference on Computer Vision (ICCV), Oct. 2019.</div>
                            <div class="link"><a href="https://openaccess.thecvf.com/content_ICCV_2019/papers/Ho_SME-Net_Sparse_Motion_Estimation_for_Parametric_Video_Prediction_Through_Reinforcement_ICCV_2019_paper.pdf">PDF</a> | <a href="#">Github</a></div>
                            <button class="button" onclick="ShowAbstract('research_DVP_1');">Abstract</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                           <div class="abstract" id="research_DVP_1">
                            This paper leverages a classic prediction technique,
                            known as parametric overlapped block motion compensation (POBMC), in a reinforcement learning framework for
                            video prediction. Learning-based prediction methods with
                            explicit motion models often suffer from having to estimate
                            large numbers of motion parameters with artificial regularization. Inspired by the success of sparse motion-based
                            prediction for video compression, we propose a parametric video prediction on a sparse motion field composed of
                            few critical pixels and their motion vectors. The prediction
                            is achieved by gradually refining the estimate of a future
                            frame in iterative, discrete steps. Along the way, the identification of critical pixels and their motion estimation are addressed by two neural networks trained under a reinforcement learning setting. Our model achieves the state-of-theart performance on CaltchPed, UCF101 and CIF datasets
                            in one-step and multi-step prediction tests. It shows good
                            generalization results and is able to learn well on small
                            training data.
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="research_td">
                            <img class="research_img" src="research/compression/Videopred/` + Videopredimg2 + `"></img>
                            <div class="research_title">Deep Video Prediction Through Sparse Motion Regularization</div>
                            <div class="research_author">Yung-Han Ho, Chih Chun Chan, Wen-Hsiao Peng</div>
                            <div class="research_from">IEEE International Conference on Image Processing (ICIP), Oct. 2020.</div>
                            <div class="link"><a href="">PDF</a> | <a href="#">Github</a></div>
                            <button class="button" onclick="ShowAbstract('research_DVP_2');">Abstract</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                           <div class="abstract" id="research_DVP_2">
                            This paper leverages a classic prediction technique,
                            known as parametric overlapped block motion compensation (POBMC), in a reinforcement learning framework for
                            video prediction. Learning-based prediction methods with
                            explicit motion models often suffer from having to estimate
                            large numbers of motion parameters with artificial regularization. Inspired by the success of sparse motion-based
                            prediction for video compression, we propose a parametric video prediction on a sparse motion field composed of
                            few critical pixels and their motion vectors. The prediction
                            is achieved by gradually refining the estimate of a future
                            frame in iterative, discrete steps. Along the way, the identification of critical pixels and their motion estimation are addressed by two neural networks trained under a reinforcement learning setting. Our model achieves the state-of-theart performance on CaltchPed, UCF101 and CIF datasets
                            in one-step and multi-step prediction tests. It shows good
                            generalization results and is able to learn well on small
                            training data 
                           </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="topic">
                <img class="title_num" src='figures/2.png'><img>
                Learning-based Image/Video Compression
            </div>
            <table class="research_table">
                <tbody>
                    <tr>
                        <td class="research_td">
                            <img class="research_img" src="research/compression/Compression/` + Compressionimg + `"></img>
                            <div class="research_title">An Autoencoder-based Image Compressor with Principle Component Analysis and Soft-Bit Rate Estimation</div>
                            <div class="research_author">Chih-Peng Chang, David Alexandr, Wen-Hsiao Peng, Hsueh-Ming Hang</div>
                            <div class="research_from">IEEE Conference on Computer Vision and Pattern Recognition (CVPR) Workshops, Jun. 2019.</div>
                            <div class="link"><a href="https://arxiv.org/abs/1902.07385">PDF</a> | <a href="#">Github</a></div>
                            <button class="button" onclick="ShowAbstract('research_IVC_1');">Abstract</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                           <div class="abstract" id="research_IVC_1">
                           We propose a lossy image compression system using the
                            deep-learning autoencoder structure to participate in the
                            Challenge on Learned Image Compression (CLIC) 2018.
                            Our autoencoder uses the residual blocks with skip connections to reduce the correlation among image pixels and condense the input image into a set of feature maps, a compact
                            representation of the original image. The bit allocation and
                            bitrate control are implemented by using the importance
                            maps and quantizer. The importance maps are generated
                            by a separate neural net in the encoder. The autoencoder
                            and the importance net are trained jointly based on minimizing a weighted sum of mean squared error, MS-SSIM,
                            and a rate estimate. Our aim is to produce reconstructed
                            images with good subjective quality subject to the 0.15 bitsper-pixel constraint. 
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
Add materials for semantic segmentation
=================================================*/
function go_SS(){
	var parent = $('#left_parent');
	var parent2 = $('#left_parent2');
	$('.left_ele').remove();
	var newele = `
	<div class="left_ele title_style">
		Semantic Segmentation
	</div>`;
	
	var newele2 = `
		<div class="left_ele ele_container">  
            <div class="topic">
                <img class="title_num" src='figures/1.png'><img>
                Domain Adaptation for Semantic Segmentation
            </div>
            <table class="research_table">
                <tbody>
                    <tr>
                        <td class="research_td">
                            <img class="research_img" src="research/segmentation/DA_1.jpg"></img>
                            <div class="research_title">All about Structure: Adapting Structural Information across Domains for Boosting Semantic Segmentation</div>
                            <div class="research_author">Wei-Lun Chang,  Hui-Po Wang, Wen-Hsiao Peng, Wei-Chen Chiu</div>
                            <div class="research_from">IEEE Computer Society Conference on Computer Vision and Pattern Recognition (CVPR), June 2019.</div>
                            <div class="link"><a href="https://arxiv.org/abs/1903.12212">PDF</a> | <a href="https://github.com/a514514772/DISE-Domain-Invariant-Structure-Extraction">Github</a> | <a href="https://a514514772.github.io/DISE-Domain-Invariant-Structure-Extraction/">Project Page</a></div>
                            <button class="button" onclick="ShowAbstract('research_DA_1');">Abstract</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                           <div class="abstract" id="research_DA_1">
                            In this paper we tackle the problem of unsupervised
                            domain adaptation for the task of semantic segmentation,
                            where we attempt to transfer the knowledge learned upon
                            synthetic datasets with ground-truth labels to real-world
                            images without any annotation. With the hypothesis that
                            the structural content of images is the most informative and
                            decisive factor to semantic segmentation and can be readily shared across domains, we propose a Domain Invariant
                            Structure Extraction (DISE) framework to disentangle images into domain-invariant structure and domain-specific
                            texture representations, which can further realize imagetranslation across domains and enable label transfer to improve segmentation performance. Extensive experiments
                            verify the effectiveness of our proposed DISE model and
                            demonstrate its superiority over several state-of-the-art approaches.
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="topic">
                <img class="title_num" src='figures/2.png'><img>
                Video Semantic Segmentation
            </div>
            <table class="research_table">
                <tbody>
                    <tr>
                        <td class="research_td">
                            <img class="research_img" src="research/segmentation/VSS_1.png"></img>
                            <div class="research_title">Semantic Segmentation on Compressed Video Using Block Motion Compensation and Guided Inpainting</div>
                            <div class="research_author">Stefanie Tanujaya, Tieh Chu, Jia-Hao Liu, Wen-Hsiao Peng</div>
                            <div class="research_from">IEEE International Symposium on Circuits and Systems (ISCAS), Spain, Oct 2020.</div>
                            <div class="link"><a href="#">PDF</a> | <a href="#">Github</a></div>
                            <button class="button" onclick="ShowAbstract('research_VSS_1');">Abstract</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                           <div class="abstract" id="research_VSS_1">
                           	This paper addresses the problem of fast semantic segmentation on compressed video. 
                            Unlike most prior works for video segmentation, which perform feature propagation based on optical flow estimates or sophisticated warping techniques, 
                            ours takes advantage of block motion vectors in the compressed bitstream to propagate the segmentation of a keyframe to subsequent non-keyframes. 
                            This approach, however, needs to respect the inter-frame prediction structure, 
                            which often suggests recursive, multi-step prediction with error propagation and accumulation in the temporal dimension. To tackle the issue, 
                            we refine the motion-compensated segmentation using inpainting. Our inpainting network incorporates guided non-local attention for long-range reference and pixel-adaptive convolution for ensuring the local coherence of the segmentation. 
                            A fusion step then follows to combine both the motion-compensated and inpainted segmentations. 
                            Experimental results show that our method outperforms the state-of-the-art baselines in terms of segmentation accuracy. 
                            Moreover, it introduces the least amount of network parameters and multiply-add operations for non-keyframe segmentation. 
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
Add materials for incremental learning
=================================================*/
function go_IL(){
	var parent = $('#left_parent');
	var parent2 = $('#left_parent2');
	$('.left_ele').remove();
	var newele = `
	<div class="left_ele title_style">
		Incremental Learning
	</div>`;
	
	var newele2 = `
		<div class="left_ele" style="text-align:center;margin-top:3%;">
            <img  src="/figures/unavailable.png" alt="error" style="width:15vw;height:15vw;border:0;">
		</div>
	`;
	parent.append(newele);
	parent2.append(newele2);
}

/*=================================================
Add materials for AI Drone
=================================================*/
function go_drone(){
	var parent = $('#left_parent');
	var parent2 = $('#left_parent2');
	$('.left_ele').remove();
	var newele = `
	<div class="left_ele title_style">
		AI Drone
	</div>`;
	
	var newele2 = `
        <div class="left_ele ele_container">  
            <table class="research_table">
                <tbody>
                    <tr>
                        <td class="research_td">
                            <iframe class="research_img" src="https://www.youtube.com/embed/BgyGibg9tH0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="research_td">
                            <iframe class="research_img" src="https://www.youtube.com/embed/X3WpaQzZBfE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
      </div>
	`;
	parent.append(newele);
	parent2.append(newele2);
}

