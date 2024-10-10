import React, { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./worker_profile.css";
import {
  getSingleWorkerAction,
  workerisFreeUpdateAction,
} from "../../action/auth_admin/AdminMaintainAction";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Footer from "../../components/footer/Footer";
import { Localhost } from "../../action/host/HostConnection";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
const WorkerProfile = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleworker } = useSelector((state) => state.sigleWorkerState);
  const { isUpdateWorker, error } = useSelector(
    (state) => state.allworkerState
  );
  const { userInfo } = useSelector((state) => state.loginState);
  useEffect(() => {
    dispatch(getSingleWorkerAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isUpdateWorker) {
      toast.success("worker is free update successfully!");
    }
  }, [isUpdateWorker, error, toast]);

  let Five = 0;
  let Four = 0;
  let Thire = 0;
  let Two = 0;
  let One = 0;

  singleworker?.reviews?.forEach((item) => {
    if (item.rating === 5) {
      Five += 1;
    }
    if (item.rating === 4) {
      Four += 1;
    }
    if (item.rating === 3) {
      Thire += 1;
    }
    if (item.rating === 2) {
      Two += 1;
    }
    if (item.rating === 1) {
      One += 1;
    }
  });

  const isfreeHandler = (id, text) => {
    dispatch(workerisFreeUpdateAction(id, text));
  };
  return (
    <div className="bg-blue-200 relative">
      {/* <Header /> */}
      <div className="border shadow-sm  text-white hover:bg-blue-200 z-10 pl-5 pr-5 pb-1 pt-1  m-4 absolute">
        <button onClick={() => navigate(-1)} className="">
          <ArrowBackIcon style={{ fontSize: "12px" }} />
          Back
        </button>
      </div>
      <div class="profile_container ">
        <div class="profile">
          <div class="profile-photo">
            <img src={Localhost + `/images/avatars/${singleworker?.avatar}`} />
          </div>
          <div class="profile-info">
            <h2 class="heading heading-light">Profile</h2>
            <p class="profile-text">{singleworker?.profile_description}</p>
            <div class="contacts">
              {singleworker?.user?.phone ? (
                <div class="contacts-item">
                  <h3 class="contacts-title">
                    <i class="fas fa-phone-volume"></i>
                    Phone
                  </h3>
                  <a href="tel:+18001234567" class="contacts-text">
                    {singleworker?.user?.phone}
                  </a>
                </div>
              ) : (
                <div class="contacts-item">
                  <h3 class="contacts-title">
                    <i class="fas fa-envelope"></i>
                    Email
                  </h3>
                  <a href="mailto:Robertsmith@gamil.com" class="contacts-text">
                    {singleworker?.user?.email}
                  </a>
                </div>
              )}
              <div class="contacts-item">
                <h3 class="contacts-title">
                  <i class="fas fa-globe-americas"></i>
                  Gender
                </h3>
                <a href="http://www.robertsmith.com" class="contacts-text">
                  {singleworker?.gender}
                </a>
              </div>
              <div class="contacts-item">
                <h3 class="contacts-title">
                  <i class="fas fa-map-marker-alt"></i>
                  Home
                </h3>
                <address class="contacts-text">
                  {singleworker?.address},{singleworker?.area}
                </address>
              </div>
              <div class="contacts-item">
                <h3 class="contacts-title">
                  <i class="fas fa-globe-americas"></i>
                  Relationship
                </h3>
                <a href="http://www.robertsmith.com" class="contacts-text">
                  {singleworker?.relationship}
                </a>
              </div>
              <div class="contacts-item">
                <h3 class="contacts-title">
                  <i class="fas fa-globe-americas"></i>
                  Education and Qualification
                </h3>
                <a href="http://www.robertsmith.com" class="contacts-text">
                  {singleworker?.education_qualification}
                </a>
              </div>
              <div class="contacts-item">
                <h3 class="contacts-title">
                  <i class="fas fa-globe-americas"></i>
                  Worker Is Free
                </h3>
                {userInfo?.user?.userType === "admin" ? (
                  <div>
                    {["YES", "NO"].map((i) => (
                      <FormControlLabel
                        label={i}
                        control={
                          <Checkbox
                            {...label}
                            color="secondary"
                            onClick={() => isfreeHandler(singleworker?._id, i)}
                            style={{
                              backgroundColor:
                                singleworker?.is_free == i ? "green" : "",
                            }}
                          />
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <div>
                    <a href="http://www.robertsmith.com" class="contacts-text">
                      {singleworker?.is_free}
                    </a>
                  </div>
                )}
              </div>
            </div>
            <h2 class="heading heading-light">Languages</h2>
            <div class="languages">
              {singleworker?.languages?.map((i) => (
                <div class="language">
                  <span class="language-text">{i}</span>
                  <strong class="languages-per">100%</strong>
                </div>
              ))}
              <div class="lines">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
              </div>
            </div>
          </div>
        </div>

        <div class="resume">
          <div class="resume-wrap ">
            <div class="logo">
              <div class="logo-lines logo-lines_left">
                <span class="logo-line"></span>
                <span class="logo-line"></span>
                <span class="logo-line"></span>
              </div>
              <button class="logo-img text-orange-300">EDIT STATUS</button>
              <div class="logo-lines logo-lines_right">
                <span class="logo-line"></span>
                <span class="logo-line"></span>
                <span class="logo-line"></span>
              </div>
            </div>
            <div class="skills text-red-600">
              <h2 class="heading heading_dark heading_skills">Reviews</h2>
              <ul class="skills-list">
                <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
                  <div className="flex items-center gap-2">
                    <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                      5
                    </p>
                    <svg
                      className="h-4 w-4 shrink-0 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        style={{ width: `${Five}%` }}
                        className="h-1.5 rounded-full bg-yellow-300 "
                      ></div>
                    </div>
                    <a
                      href="#"
                      className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                    >
                      239 <span className="hidden sm:inline">reviews</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                      4
                    </p>
                    <svg
                      className="h-4 w-4 shrink-0 bg-bl text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        style={{ width: `${Four}` }}
                        className="h-1.5 rounded-full bg-yellow-300 "
                      ></div>
                    </div>
                    <a
                      href="#"
                      className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                    >
                      432 <span className="hidden sm:inline">reviews</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                      3
                    </p>
                    <svg
                      className="h-4 w-4 shrink-0 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        style={{ width: `${Thire}%` }}
                        className="h-1.5 rounded-full bg-yellow-300"
                      ></div>
                    </div>
                    <a
                      href="#"
                      className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                    >
                      53 <span className="hidden sm:inline">reviews</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                      2
                    </p>
                    <svg
                      className="h-4 w-4 shrink-0 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        style={{ width: `${Two}%` }}
                        className="h-1.5 rounded-full bg-yellow-300 "
                      ></div>
                    </div>
                    <a
                      href="#"
                      className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                    >
                      32 <span className="hidden sm:inline">reviews</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                      1
                    </p>
                    <svg
                      className="h-4 w-4 shrink-0 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        style={{ width: `${One}%` }}
                        className="h-1.5 rounded-full bg-yellow-300"
                      ></div>
                    </div>
                    <a
                      href="#"
                      className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                    >
                      13 <span className="hidden sm:inline">reviews</span>
                    </a>
                  </div>
                </div>
              </ul>
            </div>

            <div class="experience text-red-400">
              <h2 class="heading heading_dark"></h2>
              <div className="flex items-center gap-0.5">
                <ReactStars
                  count={5}
                  value={singleworker?.ratings}
                  size={30}
                  activeColor="#ffd700"
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                />
              </div>
              <ul class="list overflow-y-auto h-screen">
                <h2 class="heading heading_dark ">Worker All Reviews</h2>
                <li class="list-item">
                  <h4 class="list-item__title">
                    Hexogan Web Development Company
                  </h4>
                  <div className="flex items-center gap-0.5">
                    <ReactStars
                      count={5}
                      value={singleworker?.ratings}
                      size={10}
                      activeColor="#ffd700"
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                    />
                  </div>
                  <span class="list-item__date">Jan 2016 - 0ct 2016</span>
                  <p class="list-item__text">
                    Fleeing from the Cylon tyranny the last Battlestar –
                    Galactica - leads a rag-tag fugitive fleet on a lonely quest
                    - a shining planet known as Earth? Texas tea.
                  </p>
                </li>
                <li class="list-item">
                  <h4 class="list-item__title">
                    Hexogan Web Development Company
                  </h4>
                  <ReactStars
                    count={5}
                    value={singleworker?.ratings}
                    size={10}
                    activeColor="#ffd700"
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                  />
                  <span class="list-item__date">Jan 2016 - 0ct 2016</span>
                  <p class="list-item__text">
                    Fleeing from the Cylon tyranny the last Battlestar –
                    Galactica - leads a rag-tag fugitive fleet on a lonely quest
                    - a shining planet known as Earth? Texas tea.
                  </p>
                </li>
                <li class="list-item">
                  <h4 class="list-item__title">
                    Hexogan Web Development Company
                  </h4>
                  <ReactStars
                    count={5}
                    value={singleworker?.ratings}
                    size={10}
                    activeColor="#ffd700"
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                  />
                  <span class="list-item__date">Jan 2016 - 0ct 2016</span>
                  <p class="list-item__text">
                    Fleeing from the Cylon tyranny the last Battlestar –
                    Galactica - leads a rag-tag fugitive fleet on a lonely quest
                    - a shining planet known as Earth? Texas tea.
                  </p>
                </li>
                <li class="list-item">
                  <h4 class="list-item__title">
                    Hexogan Web Development Company
                  </h4>
                  <ReactStars
                    count={5}
                    value={singleworker?.ratings}
                    size={10}
                    activeColor="#ffd700"
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                  />
                  <span class="list-item__date">Jan 2016 - 0ct 2016</span>
                  <p class="list-item__text">
                    Fleeing from the Cylon tyranny the last Battlestar –
                    Galactica - leads a rag-tag fugitive fleet on a lonely quest
                    - a shining planet known as Earth? Texas tea.
                  </p>
                </li>
                <li class="list-item">
                  <h4 class="list-item__title">
                    Hexogan Web Development Company
                  </h4>
                  <ReactStars
                    count={5}
                    value={singleworker?.ratings}
                    size={10}
                    activeColor="#ffd700"
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                  />
                  <span class="list-item__date">Jan 2016 - 0ct 2016</span>
                  <p class="list-item__text">
                    Fleeing from the Cylon tyranny the last Battlestar –
                    Galactica - leads a rag-tag fugitive fleet on a lonely quest
                    - a shining planet known as Earth? Texas tea.
                  </p>
                </li>
                <li class="list-item">
                  <h4 class="list-item__title">
                    Hexogan Web Development Company
                  </h4>
                  <ReactStars
                    count={5}
                    value={singleworker?.ratings}
                    size={10}
                    activeColor="#ffd700"
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                  />
                  <span class="list-item__date">Jan 2016 - 0ct 2016</span>
                  <p class="list-item__text">
                    Fleeing from the Cylon tyranny the last Battlestar –
                    Galactica - leads a rag-tag fugitive fleet on a lonely quest
                    - a shining planet known as Earth? Texas tea.
                  </p>
                </li>
                <li class="list-item">
                  <h4 class="list-item__title">
                    Hexogan Web Development Company
                  </h4>
                  <ReactStars
                    count={5}
                    value={singleworker?.ratings}
                    size={10}
                    activeColor="#ffd700"
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                  />
                  <span class="list-item__date">Jan 2016 - 0ct 2016</span>
                  <p class="list-item__text">
                    Fleeing from the Cylon tyranny the last Battlestar –
                    Galactica - leads a rag-tag fugitive fleet on a lonely quest
                    - a shining planet known as Earth? Texas tea.
                  </p>
                </li>
              </ul>
            </div>
            <div class="education text-red-400">
              <h2 class="heading heading_dark">Services</h2>
              <ul class="list">
                {singleworker?.services?.map((item) => (
                  <li
                    style={{ listStyle: "none" }}
                    className="list-item  list-item_non-border"
                  >
                    <p class="list-item__title">{item.service.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WorkerProfile;
