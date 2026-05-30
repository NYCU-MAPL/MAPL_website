/*=================================================
Add publication list here
=================================================*/
function go_Publication(){
    /*location.href("pages/publication.html");*/
	var parent = $('#left_parent');
	var parent2 = $('#left_parent2');
	$('.left_ele').remove();
	var newele = `
	<div class="left_ele title_style">
		Publication
	</div>`;
	
	var newele2 = `
        <div class="ele_container">
            <div class="left_ele title">
                Journal Publications
            </div>
            <div class="left_ele content">
                <ul>
					   <li>
                          <p class="PAPER">
                             <span>
                             	H. P. Wang, W. H. Peng, and W. J. Ko, "Learning Priors for Adversarial Autoencoders,"
                               <i><a target="_blank" href="https://doi.org/10.1017/ATSIP.2019.25">APSIPA Transactions on Signal and Information Processing</a></i>, Nov. 2019.
                             </span>
                          </p>
                      </li>
					   <li>
                          <p class="PAPER">
                             <span>
                               M. Wien, J. M. Boyce , T. Stockhammer, and W. H. Peng, "Guest Editorial: Immersive Video Coding and Transmission,"
                               <i><a target="_blank" href="https://ieeexplore.ieee.org/document/8664429">IEEE Journal on Emerging and Selected Topics in Circuits and Systems</a></i>, Mar. 2019.
                             </span>
                          </p>
                      </li>

					  <li>
                          <p class="PAPER">
                             <span>
                               M. Wien, J. M. Boyce , T. Stockhammer, and W. H. Peng, "Immersive Video Coding Standardization Status,"
                               <i><a target="_black" href="https://ieeexplore.ieee.org/document/8641398">IEEE Journal on Emerging and Selected  Topics in Circuits and Systems</a></i>, Mar. 2019.
                             </span>
                          </p>
                      </li>

				      <li>
                          <p class="PAPER">
                             <span>
                               W.-H. Peng, J. Xu, R. A. Cohen, J. Ostermann, "Guest Editorial: Screen Content Video Coding and Applications,"
                               <i><a target="_blank" href="http://ieeexplore.ieee.org/document/7769202/">IEEE Journal on Emerging Selected Topics in Circuits and Systems</a></i>, vol. 6, no. 4, pp. 389 - 392, Dec. 2016
                             </span>
                          </p>
                      </li>

					  <li>
                         <p class="PAPER">
	                    	<span>
                            W.-H. Peng, F. Walls, R. A. Cohen, J. Xu, J. Ostermann, S. MacInnis, and T. Lin, “Overview of Screen Content Video Coding: Technologies, Standards, and Beyond,”
                            <i><a target="_blank" href="http://ieeexplore.ieee.org/document/7769190/">IEEE Journal on Emerging Selected Topics in Circuits and Systems</a></i>, vol. 6, no. 4, pp. 393 - 408, Dec. 2016
                            </span>
                          </p>
                      </li>
					  <li>
                          <p class="PAPER">
                             <span>
                               C. C. Chen and W. H. Peng, "Intra Line Copy for HEVC Screen Content Intra-Picture Prediction,"
                               <i><a target="_blank" href="http://ieeexplore.ieee.org/document/7434619/">IEEE Trans. Circuits Syst. Video Technol</a></i>, vol. 27, no. 7, pp. 1568 - 1579, July 2017
                             </span>
                          </p>
                      </li>
				      <li>
                         <p class="PAPER">
	                    	<span>	W. H. Peng and C. C. Chen, "An Inter-Frame Prediction Technique Combining Template Matching Prediction and Block Motion Compensation for High Efficiency Video Coding,"
							<i><a target="_blank" href="http://ieeexplore.ieee.org/document/6468083/">IEEE Transactions on Circuits and Systems for Video Technology</a></i>, vol. 23, no. 8, pp. 1432-1446, Aug. 2013.
                            </span></p>
                      </li>
                      <li>
                         <p class="PAPER">
	                    	<span>	Y. W. Chen and W. H. Peng, "Parametric OBMC for Pixel-Adaptive Temporal Prediction on Irregular Motion
                                    Sampling Grids,"
									<i><a target="_blank" href="http://ieeexplore.ieee.org/document/5782943/">IEEE Transactions on Circuits and Systems for Video Technology</a></i>, vol. 22, no. 1,
                                    pp. 113-127, Jan. 2012.
                            </span></p>
                      </li>
                      <li>
                         <p class="PAPER">
	                    	<span>H. C. Lin, H. M. Hang and W. H. Peng, "Fast Bi-directional Prediction Selection in H.264/MPEG-4 AVC Temporal Scalable Video Coding,"
							<i><a target="_blank" href="http://ieeexplore.ieee.org/document/5771590/">IEEE Transactions on Image Processing</a></i>, vol. 20, no. 12, pp. 3508-3523, Dec. 2011.
                        </span></p>
                      </li>
                      <li>
                         <p class="PAPER">
	                    	<span>	H. C. Lin, W. H. Peng, and H. M. Hang, "Fast Context-Adaptive Mode Decision
                                    Algorithm for Scalable Video Coding with Combined Coarse-Grain Quality
                                    Scalability (CGS) and Temporal Scalability," <i>IEEE Transactions on Circuits and Systems for Video Technology</i>, vol. 20, no. 5,
                                    pp. 732-748, May 2010.
                            </span></p>
                      </li>
                      <li>
                         <p class="PAPER">
                            <span>
                               W. H. Peng, J. K. Zao, H. T. Huang, T. W. Wang, and L. S. Huang, "A Rate Distortion Optimization Model for SVC
                               Inter-layer Encoding and Bitstream Extraction," <i>Journal of Visual Communication and Image Representation</i>,
                               vol. 19, no. 8, pp. 543-557, Dec. 2008.
                            </span>
                         </p>
                      </li>
                      <li>
                         <p class="PAPER">
                            <span>
                              H. C. Huang, W. H. Peng, T. Chiang, and H. M. Hang, "Advances in the Scalable Extension of H.264/AVC," <i>IEEE
                              Communications Magazine</i>, vol. 45, no. 1, pp. 68-76, Jan. 2007.
                            </span>
                         </p>
                      </li>
                      <li>
                         <p class="PAPER">
                            <span>
                              C. H. Li, W. H. Peng, and T. Chiang, "Design of Memory Sub-System with Constant Rate Bumping Process for H.264/AVC
                              Decoder," <i>IEEE Transactions on Consumer Electronics</i>, vol. 53, no. 1, pp. 209-217, Feb. 2007.
                            </span>
                         </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               W. H. Peng, T. Chiang, H. M. Hang and C. Y. Lee, "A Context Adaptive Binary Arithmetic Codec with Maximum likelihood
                               based Stochastic Bit Reshuffling (SBR) Technique for Scalable Video Coding," <i>IEEE Transactions on Multimedia</i>, vol.
                               8, no. 4, pp. 654-667, Aug. 2006.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               S. H. Wang, W. H. Peng, Y. W. He, G. Y. Lin, C. Y. Lin, S. C. Chang, C. N. Wang and T. Chiang, "A Software-Hardware
                               Co-Implementation of MPEG-4 Advanced Video Coding (AVC) Decoder with Block Level Pipelining," <i>International Journal of
                               VLSI Signal Processing</i>, vol. 41, no. 1, pp. 93-110, Aug. 2005.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               S. C. Chang, W. H. Peng, S. H. Wang and T. Chiang, "A Platform based Bus-interleaved Architecture for Deblocking
                               Filter in H.264/MPEG-4 AVC," <i>IEEE Transactions on Consumer Electronics</i>, vol. 51, no.1, pp. 249-255, Feb. 2005.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               W. H. Peng and Y. K. Chen, "Enhanced Mode Adaptive Fine Granularity Scalability," <i>International Journal of Imaging
                               Systems and Technology</i>, vol. 13, no. 6, pp. 308-321, Nov. 2003.
                             </span>
                          </p>
                      </li>

                </ul>
            </div>
            <div class="left_ele title">
                Conference Publications
            </div>
            <div class="left_ele content">
                <ul>
                    <li>Y. H. Ho, C. C. Chan, and W. H Peng, "Deep Video Prediction Through Sparse Motion Regularization," IEEE International Conference on Image Processing (ICIP), Oct. 2020.</li>
                    <li>S. Tanujaya, T. Chu, J. H. Liu, and W. H. Peng, "Semantic Segmentation on Compressed Video Using Block Motion Compensation and Guided Inpainting," IEEE International Symposium on Circuits and Systems (ISCAS), Spain, Oct 2020.</li>
                    <li>Y. H. Ho, C. C. Chan, D. Alexandre, W. H. Peng, C. P. Chang, "P-frame Coding Proposal by NCTU: Parametric Video Prediction through Backprop-based Motion Estimation," IEEE Conference on Computer Vision and Pattern Recognition (CVPR) Workshops, Jun. 2020.</li>
                    <li>C. P. Chang, D. Alexandre, W. H. Peng, H. M. Hang, "Description of Challenge Proposal by NCTU: An Autoencoder-based Image Compressor with Principle Component Analysis and Soft-Bit Rate Estimation," IEEE Conference on Computer Vision and Pattern Recognition (CVPR) Workshops, Jun. 2019.</li>
                    <li>Y. H. Ho, C. Y. Cho, W. H Peng, and G. L. Jin, "SME-Net: Sparse Motion Estimation for Parametric Video Prediction through Reinforcement Learning," IEEE International Conference on Computer Vision (ICCV), Oct. 2019.</li>
                    <li>Y. W. Chang and W. H. Peng, "Learning Goal-oriented Visual Dialogue: Imitating and Surpassing Analytic Experts," IEEE International Conference on Multimedia and Expo (ICME), July 2019.</li>
                    <li>Y.-H. Ho, C.-Y. Cho, and W.-H Peng, "Deep Reinforcement Learning for Video Prediction," IEEE International Conference on Image Processing (ICIP), Sep. 2019.</li>
                    <li>
                         <p class="PAPER">
                           <span>
                             Y.-H. Ho, C.-Y. Cho, and W.-H Peng, "Deep Reinforcement Learning for Video Prediction,"
                           <i>IEEE International Conference on Image Processing (ICIP)</i>, Sep. 2019.
                           </span>
                         </p>
                     </li>

                        <li>
                             <p class="PAPER">
                               <span>
						         D. Alexandre, C. P. Chang, W. H. Peng, H. M. Hang, "Learned Image Compression with Soft Bit-based Rate-Distortion Optimization,"
						       <i>IEEE International Conference on Image Processing (ICIP)</i>, Sep. 2019.
                               </span>
                             </p>
                         </li>

						 <li>
                             <p class="PAPER">
                               <span>
						         W. L. Chang*, H. P. Wang*, W. H. Peng and W. C. Chiu, "All about Structure: Adapting Structural Information across Domains for Boosting Semantic Segmentation,"
						       <i>IEEE Computer Society Conference on Computer Vision and Pattern Recognition (CVPR)</i>, June 2019.
                               </span>
                             </p>
                         </li>

						 <li>
                             <p class="PAPER">
                               <span>
						         L. C. Chen*, J. H. Hu* and W. H. Peng, "Reinforcement Learning for HEVC/H.265 Frame-level Bit allocation,"
						       <i>IEEE International Conference on Digital Signal Processing (DSP)</i>, China, Nov. 2018.
                               </span>
                             </p>
                         </li>


						 <li>
                             <p class="PAPER">
                               <span>
						         H. P. Wang, W. J. Ko, and W. H. Peng, "Learning Priors for Adversarial Autoencoders,"
						       <i>Asia-Pacific Signal and Information Processing Association (APSIPA)</i>, USA, Nov. 2018.
                               </span>
                             </p>
                         </li>

                        <li>
                             <p class="PAPER">
                               <span>
						         D. Alexandre, C. P. Chang, W. H. Peng and H. M. Hang, "An Autoencoder-based Learned Image Compressor: Description of Challenge Proposal by NCTU,"
						       <i>CVPR Workshop and Challenge on Learned Image Compression</i>, June 2018.
                               </span>
                             </p>
                         </li>
                         <li>
                             <p class="PAPER">
                               <span>
						         J. H. Hu, W. H. Peng, and C. H. Chung, "Reinforcement Learning for HEVC/H.265 Intra-Frame Rate Control,"
						       <i>IEEE International Symposium on Circuits and Systems (ISCAS)</i>, Italy, May 2018.
                               </span>
                             </p>
                         </li>

                        <li>
                             <p class="PAPER">
                               <span>
						         C. H. Chung, W. H. Peng and J. H. Hu, "HEVC/H.265 Coding Unit Split Decision Using Deep Reinforcement Learning,"
						       <i>Proc. IEEE International Symposium on Intelligent Signal Processing and Communication Systems (ISPACS)</i>, Xiamen, Nov. 2017.
                               </span>
                             </p>
                         </li>
						 <li>
                             <p class="PAPER">
                               <span>
						         W. L. Ku, H. C. Chou, and W. H. Peng, "Discriminatively-learned Global Image Representation Using CNN as a Local Feature Extractor for Image Retrieval,"
						       <i>Proc. IEEE International Conference on Visual Communications and Image Processing (VCIP)</i>, Singapore, Dec. 2015.
                               </span>
                             </p>
                         </li>
							<li>
                          <p class="PAPER">
                             <span>
							   R. L. Liao, C. C. Chen, and W. H. Peng, "On Comparison of Intra Line Copy and Intra String Copy for HEVC Screen Content Coding,"
							   <i>Proc. IEEE International Conference on Visual Communications and Image Processing (VCIP)</i>, Singapore, Dec. 2015.
                             </span>
                          </p>
                      </li>
					  <li>
                          <p class="PAPER">
                             <span>
							   T. S. Chang, C. C. Chen, R. L. Liao, C. W. Kuo, and W. H. Peng, "Intra Line Copy for HEVC Screen Content Coding,"
							   <i>Proc. Asia-Pacific Signal and Information Processing Association Annual Summit and Conference (ASC)</i>, Cambodia, Dec. 2014.
                             </span>
                          </p>
                      </li>

				      <li>
						  <p class="PAPER">
							 <span>
							  Y. A. Jian, C. C. Chen, and W. H. Peng, "Mode-Dependent Distortion Modeling for H.264/SVC Coarse Grain Scalability,"
							  <i>Proc. IEEE International Conference on Image Processing (ICIP)</i>, France, Oct. 2014.
	                         </span>
	                      </p>
					  </li>

					  <li>
						  <p class="PAPER">
							 <span>
							  C. C. Chen, X. Xu, R. L. Liao, W. H. Peng, S. Liu, and S. Lei, "Screen Content Coding Using Non-square Intra Block Copy for HEVC,"
							  <i>Proc. IEEE International Conference on Multimedia and Expo (ICME)</i>, China, July 2014.
	                         </span>
	                      </p>
					  </li>
					  <li>
						  <p class="PAPER">
							 <span>
							  Y. H. Wu, W. L. Ku, W. H. Peng, and H. C. Chou, "Global Image Representation Using Locality-constrained Linear Coding for Large-Scale Image Retrieval,"
							  <i>Proc. IEEE International Symposium on Circuits and Systems (ISCAS)</i>, Australia, June 2014.
	                         </span>
	                      </p>
					  </li>
					  <li>
						  <p class="PAPER">
							 <span>
							  C. C. Chen, W. H. Peng, and S. C. Chou, "Multi-hypothesis Temporal Prediction using Template Matching Prediction and Block Motion Compensation for High Efficiency Video Coding,"
							  <i>Proc. Pacific-Rim Conference on Multimedia (PCM)</i>, Singapore, Dec. 2012.
	                         </span>
	                      </p>
					  </li>
					  <li>
						  <p class="PAPER">
							 <span>
							  C. C. Chen and W. H. Peng, "An Inter-Frame Prediction Technique Combining Template Matching Prediction and Block Motion Compensation for HEVC,"
							  <i>Proc. IPPR Conference on Computer Vision, Graphics, and Image Processing (CVGIP)</i>, NanTou, Taiwan, Aug. 2012.
	                         </span>
	                      </p>
					  </li>
                      <li>
						  <p class="PAPER">
							 <span>
							  C. H. Wu, Y. C. Tseng, and W. H. Peng, "Analytical Mode-Dependent Rate and Distortion Models for H.264/SVC Coarse Grain Scalability,"
                              <i>Proc. IEEE International Symposium on Circuits and Systems (ISCAS)</i>, Seoul, Korea, May 2012.
	                         </span>
	                      </p>
					  </li>
                    <li>
						  <p class="PAPER">
							 <span>
							  C. L. Lee, C. C. Chen, Y. W. Chen, M. H. Wu, C. H. Wu and W. H. Peng, "Bi-prediction Combining Template and Block Motion Compensations,"
                              <i>Proc. IEEE International Conference on Image Processing (ICIP)</i>, Brussels, Belgium, Sep. 2011.
	                         </span>
	                      </p>
					  </li>
					  <li>
						  <p class="PAPER">
							 <span>
							  Y. W. Chen, C. L. Lee, and W. H. Peng, "Parametric Overlapped Block Motion Compensation for Pixel-Adaptive Temporal Prediction,"
							  <i>Proc. Asia-Pacific Signal and Information Processing Association Annual Summit and Conference (ASC)</i>, Singapore, Dec. 2010.
	                         </span>
	                      </p>
					  </li>
                      <li>
						  <p class="PAPER">
							 <span>
							   S. H. Wu, W. H. Peng, and T. Chiang, "Bit-Plane Compressive Sensing with Bayesian Decoding For Lossy Compression,"
							   <i>Proc. Picture Coding Symposium (PCS)</i>, Nagoya, Japan, Dec. 2010.
	                         </span>
	                      </p>
					  </li>

                <li>
                          <p class="PAPER">
                             <span>
                               Y. C. Tseng, C. H. Wu, Y. W. Chen, T. W. Wang, and W. H. Peng, "On the Analysis and Design of Motion Sampling Structure for Advanced Motion-Compensated Prediction,"
							   <i>Proc. IEEE International Conference on Image Processing (ICIP)</i>, Hong Kong, China, Sep. 2010.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               T. W. Wang, Y. W. Chen, and W. H. Peng, "Analysis of Template Matching Prediction and Its Application to Parametric Overlapped Block Motion Compensation,"
							   <i>Proc. IEEE International Symposium on Circuits and Systems (ISCAS)</i>, Paris, France, June 2010.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               C. C. Chen, Y. W. Chen, F. Y. Yang, and W. H. Peng, "A Synthesis-Quality-Oriented Depth Refinement Scheme for MPEG Free Viewpoint Television (FTV),"
							   <i>Proc. IEEE International Symposium on Multimedia (ISM)</i>, San Diego, California, USA, Dec. 2009.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               Y. W. Chen, T. W. Wang, Y. C. Tseng, W. H. Peng, and S. Y. Lee, "A Parametric Window Design for Overlapped Block Motion Compensation with Variable Block-size Motion Estimates,"
							   <i>Proc. IEEE International Workshop on Multimedia Signal Processing (MMSP)</i>, Rio de Janeiro, Brazil, Oct. 2009.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               H.-C. Lin, H.-M. Hang, and W. H. Peng, "Fast Temporal Prediction Selection for H.264/AVC Scalable Video Coding,"
                               <i>Proc. IEEE International Conference on Image Processing (ICIP)</i>, Cairo, Egypt, Nov. 2009.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               W. H. Peng, J. K. Zao, T. W. Wang, H. T. Huang, "Multidimensional SVC Bitstream Adaptation and Extraction For Rate-Distortion Optimized Heterogeneous Multicasting and Playback,"
							   <i>Proc. IEEE International Conference on Image Processing (ICIP)</i>, San Diego, California, USA, Oct. 2008.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               H. C. Lin, W. H. Peng, and H. M. Hang, "A Fast Mode Decision Algorithm with Macroblock-Adaptive Rate-Distortion Estimation for Intra-Only Scalable Video Coding,"
							   <i>Proc. IEEE International Conference on Multimedia and Expo (ICME)</i>, Hannover, Germany, June 2008.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               C. H. Li, W. H. Peng, and T. Chiang, "Design space exploration of an H.264/AVC-based video embedding transcoder using transaction level modeling,"
							   <i>Proc. IEEE International Conference on Multimedia and Expo (ICME)</i>, Hannover, Germany, June 2008.
                             </span>
                          </p>
                      </li>

                      <li>
                          <p class="PAPER">
                             <span>
                               C. H. Li, W. H. Peng, and T. Chiang, "A Reconfigurable Video Embedding Transcoder Based on H.264/AVC: Design Tradeoffs and Analysis,"
							   <i>Proc. IEEE International Symposium on Circuits and Systems (ISCAS)</i>, Seattle, Washington, USA, May 2008.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               W. H. Peng, L. S. Huang, J. K. Zao, J. S. Lu, T. W. Wang, H. T. Huang, and L. C. Kuo, "Rate-Distortion Optimized SVC Bitstream Extraction for Heterogeneous Devices : A Preliminary Investigation,"
							   <i>Proc. IEEE International Symposium on Multimedia (ISM)</i>, Taichung, Taiwan, Dec. 2007.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               H. C. Lin, W. H. Peng, H. M. Hang, and W. J. Ho, "Layer-Adaptive Mode Decision and Motion Search for Scalable Video Coding with Combined Coarse Granular Scalability and Temporal Scalability,"
							   <i>Proc. IEEE International Conference on Image Processing, (ICIP)</i>, San Antonio, Texas, USA, Sep. 2007.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               C. H. Li, C. H. Chang, W. H. Peng, W. Hwang and T. Chiang, "Design of Memory Sub-System in H.264/AVC Decoder,"
                               <i>Proc. IEEE International Conference on Consumer Electronics (ICCE)</i>, Las Vegas, Nevada, USA, Jan. 2006.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               Y. H. Guo, J. Zao, W. H. Peng, L. S. Huang, F. P. Kuo, C. M. Lin, "Trickle: Resilient Real-Time Video Multicasting for Dynamic Peers with Limited or Asymmetric Network Connectivity,"
							   <i>Proc. IEEE International Symposium on Multimedia (ISM)</i>, San Diego, California, USA, Dec. 2006.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               C. H. Li, C. C. Chen, W. C. Su, M. J. Wang, W. H. Peng, G. G. Lee and T. Chiang, "An Unified Systolic Architecture for Combined Inter and Intra Predictions in H.264/AVC Decoder,"
							   <i>Proc. International Wireless Communications on Mobile Computing Conference (IWCMC)</i>, Vancouver, Canada, July 2006.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               W. H. Peng, T. Chiang and H. M. Hang, "Adding Selective Enhancement in Scalable Video Coding Standard for Region-of-Interest Functionality,"
							   <i>Proc. IEEE International Symposium on Circuits and Systems (ISCAS)</i>, Island of Kos, Greece, 2006.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               W. H. Peng, C. Y. Tsai, T. Chiang and H. M. Hang, "Advances of MPEG Scalable Video Coding Standard,"
							   <i>Proc. KES International Wrokshop on Intelligent Information Hiding and Multimedia Signal Processing (IIHMSP)</i>, Melbourne, Australia, 2005.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               W. H. Peng, T. Chiang and H. M. Hang, "A Low Complexity Prioritized Bit-plane Coding for SNR Scalability in MPEG-21 Scalable Video Coding,"
							   <i>Proc. SPIE International Conference on Visual Communications and Image Processing (VCIP)</i>, Beijing, China, 2005.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               S. C. Chang, W. H. Peng, S. H. Wang and T. Chiang, "A Platform based Deblocking Filter Design with Bus Interleaved Architecture for H.264,"
							   <i>Proc. IEEE International Conference on Consumer Electronics (ICCE)</i>, Singapore, 2005.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               T. M. Liu, S. Z. Wang, W. H. Peng and C. Y. Lee, "Memory-Efficient and Low-Complexity Scalable Soft VLC Decoding for the Video Transmission,"
							   <i>Proc. IEEE Asia-Pacific Conference on Circuit and System (APCCAS)</i>, Tainan, Taiwan, 2004.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               W. H. Peng, T. Chiang, H. M. Hang and C. Y. Lee, "Enhanced Stochastic Bit Reshuffling for Fine Granular Scalable Video Coding,"
							   <i>Proc. IEEE Pacific Rim Conference on Multimedia (PCM)</i>, Tokyo, Japan, 2004.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               W. H. Peng, C. N. Wang, T. Chiang and H. M. Hang, "Context Adaptive Binary Arithmetic Coding with Stochastic Bit Reshuffling for Advanced Fine Granularity Scalability,"
							   <i>Proc. IEEE International Symposium on Circuits and Systems (ISCAS)</i>, Vancouver, British, 2004.
                             </span>
                          </p>
                      </li>
                      <li>
                          <p class="PAPER">
                             <span>
                               S. H. Wang, W. H. Peng, Y. W. He, G. Y. Lin, C. Y. Lin, S. C. Chang, C. N. Wang and T. Chiang, "A Platform-Based MPEG-4 Advanced Video Coding (AVC) Decoder with Block Level Pipelining,"
							   <i>Proc. IEEE Pacific Rim Conference on Multimedia (PCM)</i>, Singapore, 2003.
                             </span>
                          </p>
                      </li>
                      <li>
                         <p class="PAPER">
                            <span>
                              W. H. Peng, T. Chiang and H. M. Hang, "Context-Based Binary Arithmetic Coding for Fine Granularity Scalability,"
                              <i>Proc. International Symposium on Signal Processing and its Application (ISSPA)</i>, Paris, France, 2003.
                            </span>
                         </p>
                      </li>
                      <li>
                         <p class="PAPER">
                            <span>
                              Y. K. Chen and W. H. Peng, "Implementation of Real-time MPEG-4 FGS Encoder,"
							  <i>Proc. IEEE Pacific-Rim Conference on Multimedia (PCM)</i>, Hsinchu, Taiwan, 2002.
                            </span>
                         </p>
                      </li>
                      <li>
                         <p class="PAPER">
                            <span>
                              W. H. Peng and T. Chiang, "A Prioritized End-to-End Video Streaming Scheme Using MPEG-4 Fine Granularity Scalability,"
							  <i>Proc. Multiconference on Systemics, Cybernetics and Informatics (MSCI)</i>, Florida, USA, 2002.
                            </span>
                         </p>
                      </li>
                      <li>
                         <p class="PAPER">
                            <span>
                              W. H. Peng and Y. K. Chen, "Error Drifting Reduction in Enhanced Fine Granularity Scalability,"
							  <i>Proc. IEEE International Conference on Image Processing (ICIP)</i>, New York, USA, 2002.
                            </span>
                         </p>
                      </li>
                      <li>
                         <p class="PAPER">
                            <span>
                              W. H. Peng and Y. K. Chen, "Mode Adaptive Fine Granularity Scalability,"
							  <i>Proc. IEEE International Conference on Image Processing (ICIP)</i>, Thessaloniki, Greece, 2001.
                            </span>
                         </p>
                      </li>
                      <li>
                         <p class="PAPER">
                            <span>
                              W. H. Chiang, Y. S. Lee, W. H. Peng and C. Y. Lee, "A Line-Based, Memory Efficient and Programmable Architecture for 2D DWT Using Lifting Scheme,"
							  <i>Proc. IEEE International Symposium on Circuits and Systems (ISCAS)</i>, Sydney, Australia, 2001.
                            </span>
                         </p>
                      </li>
                      <li>
                         <p class="PAPER">
                            <span>
                              W. H. Peng, H. C. Huang and T. Chiang, "Optimization of Selective Enhancement for MPEG-4 Fine Granularity Scalability,"
							  <i>Proc. Workshop on Consumer Electronics (WCE)</i>, Taipei, Taiwan, 2000.
                            </span>
                         </p>
                      </li>
                      <li>
                         <p class="PAPER">
                            <span>
                              W. H. Peng and C. Y. Lee, "An Efficient VLSI Architecture For Separable 2-D Discrete Wavelet Transform,"
							  <i>Proc. IEEE International Conference on Image Processing (ICIP)</i>, Kobe, Japan, 1999.
                            </span>
                         </p>
                      </li>
                </ul>
              
            </div>
            <div class="left_ele title">
                Standard Contributions
            </div>
            <div class="left_ele content">
                <ul>
                    <li><p class="PAPER"><span>W. L. Ku, H. T. Lin, H. C Chou, and W. H. Peng, "Discriminatively-learned Global Image Representation Using CNN as a Local Feature Extractor for Image Retrieval," ISO/IEC JTC1/SC29/WG11, MPEG, Geneva, Switzerland, October 2015.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, W. H. Peng, and H. M. Hang, "Crosscheck of Non-CE1: Enhancement to Palette Coding by Palette with Pixel Copy (PPC) Coding (JCTVC-U0116)," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 21th meeting, JCTVC-U0173, Warsaw, Poland, June 2015.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, W. H. Peng, and H. M. Hang, "CE3: Results of Test A on Intra Line Copy," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 20th meeting, JCTVC-T0105, Geneva, Switzerland, February 2015.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, W. H. Peng, and H. M. Hang, "Crosscheck of CE3 Test B.3 on Pixel Based Flexible 2D Block Coding," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 20th meeting, JCTVC-T0106, Geneva, Switzerland, February 2015.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, W. H. Peng, and H. M. Hang, "Crosscheck of Implicit Transform Quadtree Partition for Intra Block Copy (JCTVC-T0122)," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 20th meeting, JCTVC-T0149, Geneva, Switzerland, February 2015.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, W. H. Peng, and H. M. Hang, "Crosscheck of Copy Mode for Static Screen Content Coding (JCTVC-T0138)," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 20th meeting, JCTVC-T0150, Geneva, Switzerland, February 2015.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, W. H. Peng, and H. M. Hang, "Crosscheck of Non-CE3: Improvement on Intra String Copy (JCTVC-T0139)," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 20th meeting, JCTVC-T0200, Geneva, Switzerland, February 2015.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, W. H. Peng, and H. M. Hang, "Crosscheck of Non-CE3: Vector coding for CE3-Test A on Intra line Copy mode (JCTVC-T0092)," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 20th meeting, JCTVC-T0201, Geneva, Switzerland, February 2015.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, C. W. Kuo, W. H. Peng, and H. M. Hang, "CE4: Results of Test A on Search Range of Intra Line Copy," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 19th meeting, JCTVC-S0135, Strasbourg, France, October 2014.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, C. W. Kuo, W. H. Peng, and H. M. Hang, "Non-CE4: On CABAC Throughput of Intra Line Copy," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 19th meeting, JCTVC-S0136, Strasbourg, France, October 2014.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, C. W. Kuo, W. H. Peng, and H. M. Hang, "Non-CE4: Intra Line Copy with Extended Full-frame Search for Test A," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 19th meeting, JCTVC-S0137, Strasbourg, France, October 2014.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, W. H. Peng, H. M. Hang, "Crosscheck of JCTVC-S0150: Non-CE6: Simplification on Escape Coding of Palette Mode in HEVC SCC," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 19th meeting, JCTVC-S0232, Strasbourg, France, October 2014.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, W. H. Peng, H. M. Hang, "Crosscheck of JCTVC-S0194: CE4: Results of Test C," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 19th meeting, JCTVC-S0233, Strasbourg, France, October 2014.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, W. H. Peng, H. M. Hang, "Crosscheck of JCTVC-S0188: Non-CE6: A Combination of CE6 Test C.2 – Transition-copy Mode and CE6 Test C.3 (Configuration 1) - Copy-from-previous-row Mode," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 19th meeting, JCTVC-S0288, Strasbourg, France, October 2014.</span></p></li>
                    <li><p class="PAPER"><span>C. C. Chen, T. S. Chang, R. L. Liao, C. W. Kuo, W. H. Peng, H. M. Hang, C. L. Lin, and F. D. Juo, "Non-SCCE2: Line-based Intra Copy with Unconstrained 2-D BV Coding for Test C," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 18th meeting, JCTVC-R0132, Sapporo, Japan, June 2014.</span></p></li>
                    <li><p class="PAPER"><span>T. S. Chang, C. C. Chen, R. L. Liao, C. W. Kuo, W. H. Peng, H. M. Hang, T. Lin, L. Zhao, C. L. Lin, and F. D. Jou, "SCCE2: Line-based Intra Copy with 2-D BV and PU-level Splitting (Test B), and Its Variants with Constrained PU-level Splitting (Test C) and BV Merging (Test D)," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 18th meeting, JCTVC-R0131, Sapporo, Japan, June 2014.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, W. H. Peng, H. M. Hang, "Crosscheck of SCCE1 Test 2.1 on IBC as Inter PU," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 18th meeting, JCTVC-R0129, Sapporo, Japan, June 2014.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, T. S. Chang, W. H. Peng, and H. M. Hang, "Crosscheck of SCCE4 Test 3.1 on Combined Normal 1-D Dictionary Mode and Reconstruction Based 1-D Dictionary Mode," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 18th meeting, JCTVC-R0130, Sapporo, Japan, June 2014.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, T. S. Chang, W. H. Peng, and H. M. Hang, "Crosscheck of JCTVC-R0281: An improvement on Intra Line Copy of SCCE2," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 18th meeting, JCTVC-R0292, Sapporo, Japan, June 2014.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, W. H. Peng, and H. M. Hang, "Crosscheck of Non-SCCE3 on Combination of Palette Tools (JCTVC-R0311)," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 18th meeting, JCTVC-R0329, Sapporo, Japan, June 2014.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, T. S. Chang, W. H. Peng, and H. M. Hang, "Crosscheck of Non-SCCE1 on Intra block vector difference redundancy removal (JCTVC-R0182)," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 18th meeting, JCTVC-R0337, Sapporo, Japan, June 2014.</span></p></li>
                    <li><p class="PAPER"><span>C. C. Chen, T. S. Chang, R. L. Liao, C. W. Kuo, W. H. Peng, H. M. Hang, Y. J. Chang, C. H. Hung, C. C. Lin, J. S. Tu, E. C. Ke, J. Y. Kao, C. L. Lin, F. D. Jou, and F. C. Chen, "Description of screen content coding technology proposal by NCTU and ITRI International," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 17th meeting, JCTVC-Q0032, Valencia, Spain, March 2014.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, C. C. Chen, W. H. Peng, and J. S. Tu, "Crosscheck of JCTVC-Q0132 on AMVP for BV prediction and PU syntax for IntraBC," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 17th meeting, JCTVC-Q0237, Valencia, Spain, March 2014.</span></p></li>
                    <li><p class="PAPER"><span>Y. J. Chang, C. L. Lin, C. H. Hung, C. C. Chen, W. H. Peng, and H. M. Hang, "AHG10: Line-matching above copy method," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 17th meeting, JCTVC-Q0138, Valencia, Spain, March 2014.</span></p></li>
                    <li><p class="PAPER"><span>J. Sole, E. Alshina, D. K. Kwon, and W. H. Peng, "RCE3: Summary report on HEVC Range Extensions Core Experiment 3 (RCE3) on Intra block copy refinement," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 16th meeting, JCTVC-P0034, San José, United States, January 2014.</span></p></li>
                    <li><p class="PAPER"><span>T. S. Chang, R. L. Liao, C. C. Chen, W. H. Peng, H. M. Hang, C. L. Lin, and F. D. Jou, "RCE3: Results of Subtest B.1 on Nx2N/2NxN Intra Block Copy," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 16th meeting, JCTVC-P0176, San José, United States, January 2014.</span></p></li>
                    <li><p class="PAPER"><span>T. S. Chang, R. L. Liao, C. C. Chen, W. H. Peng, H. M. Hang, C. L. Lin, F. D. Jou, C. Pang, J. Sole, L. Guo, and M. Karczewicz, "RCE3: Results of Subtest D.2 on Nx2N/2NxN/NxN Intra Block Copy," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 16th meeting, JCTVC-P0180, San José, United States, January 2014.</span></p></li>
                    <li><p class="PAPER"><span>R. L. Liao, T. S. Chang, C. C. Chen, W. H. Peng, H. M. Hang, C. L. Lin, and F. D. Jou, "RCE3: Cross-check report of Subtest B.3 - Intra Block Copy with NxN PU (JCTVC-P0145)," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 16th meeting, JCTVC-P0188, San José, United States, January 2014.</span></p></li>
                    <li><p class="PAPER"><span>C. C. Chen, R. L. Liao, T. S. Chang, W. H. Peng, H. M. Hang, C. L. Lin, and F. D. Jou, "RCE3: Results of Subtest D.1 on Combining Nx2N/2NxN Intra Block Copy with TU process," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 16th meeting, JCTVC-P0189, San José, United States, January 2014.</span></p></li>
                    <li><p class="PAPER"><span>C. H. Hung, E. C. Ke, H. T. Chiao, W. H. Peng, and H. M. Hang, "Non-RCE3: Major Color Padding Algorithm for Intra Block Copy," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 16th meeting, JCTVC-P0237, San José, United States, January 2014.</span></p></li>
                    <li><p class="PAPER"><span>Y. J. Chang, H. L. Tsai, C. L. Lin, F. D. Jou, C. C. Chen, R. L. Liao, W. H. Peng, and H. M. Hang, "Non-RCE3: Block-based padding scheme for intra block copy," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 16th meeting, JCTVC-P0238, San José, United States, January 2014.</span></p></li>
                    <li><p class="PAPER"><span>Y. J. Chang, H. L. Tsai, C. L. Lin, F. D. Jou, C. C. Chen, R. L. Liao, W. H. Peng, and H. M. Hang, "Non-RCE3: Horizontal/vertical padding scheme for intra block copy," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 16th meeting, JCTVC-P0255, San José, United States, January 2014.</span></p></li>
                    <li><p class="PAPER"><span>Y. J. Chang, H. L. Tsai, C. L. Lin, F. D. Jou, C. C. Chen, R. Ling L., W. H. Peng, and H. M. Hang, "Non-RCE3: Vertical padding schemes for intra block copy," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 16th meeting, JCTVC-P0256, San José, United States, January 2014.</span></p></li>
                    <li><p class="PAPER"><span>C. C. Chen, and W. H. Peng, "On the TU process and PU partitioning in Intra Block Copy," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 16th meeting, JCTVC-P0301, San José, United States, January 2014.</span></p></li>
                    <li><p class="PAPER"><span>J. Sole, E. Alshina, D. K. Kwon, and W. H. Peng, "HEVC Range Extensions Core Experiment 3 (RCE3): Intra block copy refinement," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 15th meeting, JCTVC-O1123, Geneva, Switzerland, October 2013.</span></p></li>
                    <li><p class="PAPER"><span>C. C. Chen, T. S. Chang, R. L. Liao, W. H. Peng, H. M. Hang, C. L. Lin, and F. D. Jou, "AHG8: Line-based Intra Block Copy," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 15th meeting, JCTVC-O0205, Geneva, Switzerland, October 2013.</span></p></li>
                    <li><p class="PAPER"><span>X. Zheng, I. S. Chong, I. K. Kim, W. H. Peng, and K. Panusopone, "Core Experiment 2: Motion Partitioning and OBMC," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 6th meeting, JCTVC-F902, Torino, Italy, July 2011.</span></p></li>
                    <li><p class="PAPER"><span>C. C. Chen, Y. Y. Chen, C. L. Lee, W. H. Peng and H. M. Hang, “CE2: Report on the Combination of OBMC with Motion Merging and Non-Square Quadtree Transform,” ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 6th meeting, JCTVC-F687, Torino, Italy, July 2011.</span></p></li>
                    <li><p class="PAPER"><span>C. C. Chen, Y. Y. Chen, C. L. Lee, W. H. Peng and H. M. Hang, “CE2: Report of OBMC with Motion Merging,” ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 6th meeting, JCTVC-F049, Torino, Italy, July 2011.</span></p></li>
                    <li><p class="PAPER"><span>X. Zheng, P. Bordes, P. Chen, I. K. Kim, W. H. Peng and L. Guo, “CE2: Summary report of Core Experiment on motion partitioning and OBMC,” ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 6th meeting, JCTVC-F022, Torino, Italy, July 2011.</span></p></li>
                    <li><p class="PAPER"><span>X. Zheng, P. Bordes, P. Chen, I. K. Kim, and W. H. Peng, "Core Experiment 2: Motion Partitioning and OBMC," ITU-T SG16 WP3 and ISO/IEC JCT1/SC29/WG11 5th meeting, JCTVC-E702, Geneva, Switzerland, March 2011.</span></p></li>
                    <li><p class="PAPER"><span>Y. J. Chiu, H. Yu, Y. W. Huang, S. Sekiguchi, and W. H. Peng, "Core Experiment 1: Summary Report of Decoder-Side Motion Vector Derivation," ITU-T SG16 WP3 and ISO/IEC JCT1/SC29/WG11 5th meeting, JCTVC-E021, Geneva, Switzerland, March, 2011.</span></p></li>
                    <li><p class="PAPER"><span>C. C. Chen, C. L. Lee, W. H. Peng, and H.M. Hang, "CE 1: Report of DMVD-based Bi-predictionn," ITU-T SG16 WP3 and ISO/IEC JCT1/SC29/WG11 5th meeting, JCTVC-E154, Geneva, Switzerland, March, 2011.</span></p></li>
                    <li><p class="PAPER"><span>Y. J. Chiu, H. Yu, Y. W. Huang, S. Sekiguchi, and W. H. Peng, "Description of Core Experiment 1: Decoder-Side Motion Vector Derivation," ITU-T SG16 WP3 and ISO/IEC JCT1/SC29/WG11 4th meeting, JCTVC-D601, Daegu, Korea, January 2011.</span></p></li>
                    <li><p class="PAPER"><span>C. L. Lee, C. C. Chen, Y. W. Chen, M. H. Wu, C. H. Wu, W. H. Peng, and H. M. Hang, "Bi-prediction Combining Template and Block Motion Compensations," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 4th meeting, JCTVC-D175, Daegu, Korea, January 2011.</span></p></li>
                    <li><p class="PAPER"><span>A. Krutz, T. Sikora, A. Glantz, S. Park, J. Lim, E. Francois, P. Chen, X. Zheng, H. Yu, S. Paschalakis, N. Sprljan, S. Li, A. Tabatabai, T. Suzuki, T. Chujoh, and W. H. Peng, "Tool Experiment 3: Inter Prediction in HEVC," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 2nd meeting, JCTVC-B303, Geneva, Switzerland, July 2010.</span></p></li>
                    <li><p class="PAPER"><span>Y. W. Chen, C. H. Wu, C. L. Lee, T. W. Wang, and W. H. Peng, “MB Mode with Joint Application of Template and Block Motion Compensations," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 2nd meeting, JCTVC-B072, Geneva, Switzerland, July 2010.</span></p></li>
                    <li><p class="PAPER"><span>A. Krutz, A. Glantz, T. Sikora, J. Park, S. Park, E. Francois, P. Yin, P. Chen, X. Zheng, H. Yu, W. J. Han, and W. H. Peng, "Tool Experiment 3: Inter Prediction in HEVC," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 1st meeting, JCTVC-A303, Dresden, Germany, April 2010.</span></p></li>
                    <li><p class="PAPER"><span>Y. W. Chen, T. W. Wang, C. H. Chan, C. L. Lee, C. H. Wu, Y. C. Tseng, W. H. Peng, C. J. Tsai, and H. M. Hang, "Description of video coding technology proposal by NCTU," ITU-T SG16 WP3 and ISO/IEC JTC1/SC29/WG11 1st meeting, JCTVC-A123, Dresden, Germany, April 2010.</span></p></li>
                    <li><p class="PAPER"><span>Y. W. Chen, W. H. Peng, and S. Y. Lee, "Adaptive Macroblock and Motion Skip Flags for Multi-View Video Coding (MVC)," ISO/IEC JTC1/SC29/WG11 and ITU-T SG16 Q.6 24th meeting, JVT-X047, Geneva, CH, July 2007.</span></p></li>
                    <li><p class="PAPER"><span>H. C. Lin, W. H. Peng, and H. M. Hang, "Low-complexity Macroblock Mode Decision Algorithm for Combined CGS and Temporal Scalability," ISO/IEC JTC1/SC29/WG11 and ITU-T SG16 Q.6 23th meeting, JVT-W029, San Jose, USA, April 2007.</span></p></li>
                    <li><p class="PAPER"><span>W. H. Peng, T. Chiang, and H. M. Hang, "CE8: ROI-based Scalable Video Coding," ISO/IEC MPEG 72th meeting, JVTO308, Busan, Korea, April 2005.</span></p></li>
                    <li><p class="PAPER"><span>W. H. Peng, T. Chiang, and H. M. Hang, "Adding Selective Enhancement Functionality to Scalable Video Coding," ISO/IEC MPEG 72th meeting, M11914 (JVT-O020), Busan, Korea, April 2005.</span></p></li>
                    <li><p class="PAPER"><span>H. C. Huang, W. H. Peng, Y. C. Lin, C. N. Wang, T. Chiang, and H. M. Hang, "Response to Cfp on Scalable Video Coding Technology: Proposal S07 -- A Robust Scalable Video Coding Technique," ISO/IEC MPEG 68th meeting, M10724, Munich, Germany, March 2004.</span></p></li>
                    <li><p class="PAPER"><span>W. H. Peng, T. Chiang, and H. M. Hang, "CE 2: Coding Efficiency and Subjective Quality Improvement for Fine Granular SNR Scalability," ISO/IEC MPEG 70th meeting, N6719, Palma, Spain, October. 2004.</span></p></li>
                    <li><p class="PAPER"><span>H. C. Huang, W. H. Peng, C. N. Wang, T. Chiang, and H. M. Hang, "Stack Robust Fine Granularity Scalability: Response to Call for Evidence on Scalable Video Coding," ISO/IEC MPEG 65th meeting, M9767, Trondheim, Norway, July 2003.</span></p></li>
                    <li><p class="PAPER"><span>W. H. Peng, T. Chiang, and H. M. Hang, "Context-Based Arithmetic Coding for FGS," ISO/IEC MPEG 61th meeting, M8606, Klagenfrut, Austria, July 2002.</span></p></li>
                    <li><p class="PAPER"><span>W. H. Peng, H. Jiang, and Y. K. Chen, "Adding Prediction Modes to Progressive Fine Granularity Scalable (PFGS) Coding," ISO/IEC MPEG 55th meeting, M6909, Pisa, Italy, January 2001.</span></p></li>
              </ul>
            </div>
            <div class="left_ele title">
                Patent
            </div>
            <div class="left_ele content">
                <ul>
                    <li>
                      <p class="PAPER">
                        <span>
                         W. H. Peng, H. M. Hang, C. C. Chen, and R. L. Liao, "Method and Apparatus for Encoding/Decoding Video by Oblong Intra Prediction,"
                          <i>R.O.C. Patent 103145939</i>, 2016.
                        </span>
                     </p>
                  </li>
                  <li>
                     <p class="PAPER">
                        <span>
                         W. H. Peng, H. M. Hang, C. C. Chen, and R. L. Liao, "Method for Encoding/Decoding Video by Oblong Intra Prediction," <i>U.S. Patent 20150189272</i>, July 2015.
                        </span>
                     </p>
                  </li>
                  <li>
                     <p class="PAPER">
                        <span>
                         Y. W. Chen and W. H. Peng, "Frame Prediction System and Prediction Method Thereof," <i>U.S. Patent 20120183069</i>, November 2013.
                        </span>
                     </p>
                  </li>
                  <li>
                     <p class="PAPER">
                        <span>
                          H. C. Lin, W. H. Peng, and H. M. Hang, "Low Complexity Macroblock Mode Decision and Motion Search Method for Scalable Video Coding with Combined Coarse Granular Scalability (CGS) and Temporal Scalability,"
                          <i>R.O.C. Patent I305696</i>, 2011.
                        </span>
                     </p>
                  </li>
                  <li>
                     <p class="PAPER">
                        <span>
                          S. C. Chang, W. H. Peng, S. H. Wang, and T. Chiang, "A Platform based Bus-interleaved Architecture for Deblocking Filter in H.264/MPEG-4 AVC,"
                          <i>R.O.C. Patent I305108</i>, 2009.
                        </span>
                     </p>
                  </li>
                  <li>
                     <p class="PAPER">
                        <span>
                          W. H. Peng and Y. K. Chen, "Method and Apparatus for Providing Prediction Mode Fine Granularity Scalability,"
                          <i>U.S. Pre-granted Patent 8199809</i>, 2009.
                       </span>
                     </p>
                  </li>

                  <li>
                     <p class="PAPER">
                        <span>
                          W. H. Peng and Y. K. Chen, "Scalable Coding Scheme for Low Latency Applications,"
                          <i>U.S. Patent 7263124</i>, August 2007.
                       </span>
                     </p>
                  </li>

                  <li>
                     <p class="PAPER">
                        <span>
                          Y. K. Chen and W. H. Peng, "Zigzag In-Order for Image/Video Encoder and Decoder,"
                          <i>U.S. Patent 20030138042</i>, May 2006.
                       </span>
                     </p>
                  </li>

                  <li>
                      <p class="PAPER">
                        <span>
                          W. H. Peng, T. Chiang, and H. M. Hang, "Context Adaptive Binary Arithmetic Coding with Stochastic Bit Reshuffling for Fine Granularity Scalability,"
                          <i>R.O.C. Patent I264952</i>, 2006.
                        </span>
                     </p>
                  </li>
                </ul>
            </div>
            <div class="left_ele title">
                Book Chapters
            </div>
            <div class="left_ele content">
                <ul>
                    <li>W. H. Peng, C. Y. Tsai, T. Chiang, and H. M. Hang, "Chapter 3 Advances of MPEG Scalable Video Coding Standard," in
                              <i>Intelligent Multimedia Data Hiding New Directions</i>, Springer-Verlag, 2007. (ISBN: 3-540-71168-6)</li>
                </ul>
            </div>
        </div>
        `;
	parent.append(newele);
	parent2.append(newele2);
	
}