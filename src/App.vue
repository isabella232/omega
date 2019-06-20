<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/display.css";

export default {
  name: "Omega"
};
</script>

<style>
  html,
  body {
    background: #0a132d;
    color: #eee;
    font-family: "Canaro", sans-serif;
    transform-origin: 0 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    margin: 0;
    font-size: 14px;
  }

  .color1 {
    color: rgb(50, 209, 126);
    /* 32D17E */
  }

  .color2 {
    color: rgb(217, 229, 6);
    /* D9E506 */
  }

  .color3 {
    color: rgb(105, 132, 209);
    /* 6984D1 */
  }

  .color4 {
    color: rgb(64, 135, 126);
    /* 40877E */
  }

  .color5 {
    color: rgb(86, 197, 201);
    /* 56C5C9 */
  }

  @font-face {
    font-family: "Canaro";
    font-style: normal;
    font-weight: normal;
    src: url("https://s3-eu-west-1.amazonaws.com/ems-assets/font-light.otf")
      format("opentype");
  }

  @font-face {
    font-family: "Canaro";
    font-style: normal;
    font-weight: bold;
    src: url("https://s3-eu-west-1.amazonaws.com/ems-assets/font-medium.otf")
      format("opentype");
  }

  @font-face {
    font-family: "Canaro Book";
    src: url("https://s3-eu-west-1.amazonaws.com/ems-assets/font-book.otf")
      format("opentype");
  }

  @font-face {
    font-family: "Canaro Black";
    src: url("https://s3-eu-west-1.amazonaws.com/ems-assets/font-black.otf")
      format("opentype");
  }

  @font-face {
    font-family: "Canaro Semi Bold";
    src: url("https://s3-eu-west-1.amazonaws.com/ems-assets/font-semi-bold.otf")
      format("opentype");
  }

  @font-face {
    font-family: "Canaro Medium";
    src: url("https://s3-eu-west-1.amazonaws.com/ems-assets/font-medium.otf")
      format("opentype");
  }

  @font-face {
    font-family: "Canaro Light";
    src: url("https://s3-eu-west-1.amazonaws.com/ems-assets/font-light.otf")
      format("opentype");
  }

  @font-face {
    font-family: "Canaro Extra Light";
    src: url("https://s3-eu-west-1.amazonaws.com/ems-assets/font-extra-light.otf")
      format("opentype");
  }

  @font-face {
    font-family: "Canaro Thin";
    src: url("https://s3-eu-west-1.amazonaws.com/ems-assets/font-thin.otf")
      format("opentype");
  }

  .font-bold {
    font-family: "Canaro Bold", sans-serif;
  }

  .font-semi-bold {
    font-family: "Canaro Semi Bold", sans-serif;
  }

  .font-light {
    font-family: "Canaro Light", sans-serif;
  }

  .font-extra-light {
    font-family: "Canaro Extra Light", sans-serif;
  }

  .font-thin {
    font-family: "Canaro Thin", sans-serif;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .el-dropdown-menu {
    background: rgba(17, 38, 74, 0.95);
    border: 1px solid #08132f;
    box-shadow: 0 6px 20px rgba(0, 19, 29, 0.8);
    margin: 0 0 0 0 !important;
    border-radius: 0;
    padding: 0;
  }

  .el-dropdown-menu__item {
    color: #fff;
    font-size: 14px;
  }

  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    background: rgba(14, 31, 60, 0.8);
    color: #fff;
  }

  .el-dropdown-menu.el-popper .popper__arrow {
    display: none !important;
  }


  .el-popover.project-popover {
    background: rgba(16, 38, 73, 0.96);
    border: 1px solid #102649;
    box-shadow: 0 1px 10px rgba(0,0,0,.4), 0 0px 50px rgba(0,0,0,.2);
    color: #fff; 
    padding: 0;
    margin-top: -50px;
    border-radius: 2px;
    max-height: 99%;
    overflow: auto;
  }

  .el-popover.project-popover .el-main {
    padding: 0;
  }

  .project-popover__header {    
    background: rgba(8, 19, 47, .6);
    padding: 15px 15px 0px 15px;
    font-size: 18px;    
    position: relative;
  }

  .project-popover__header__owner {
    font-size: 16px;
    color: #64a0b0;
    height: 22px;
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .project-popover__header__name {
    width: 370px;
    min-height: 25px;
    word-break: normal;
    text-align: left;
    font-weight: bold;
  }

  .project-popover__header__progress {
    width: 100px;
    position: absolute;
    right: 15px;
    text-align: right;
    top: 36px;
    font-weight: bold;
  }

  .project-popover__header__weeks {
    width: 200px;
    color: #64a0b0;
    position: absolute;
    right: 15px;
    text-align: right;
    top: 15px;    
    font-size: 14px;
  }

  .project-popover__progress {
    background: rgba(8, 19, 47, .6);
    height: 13px;
  }

  .project-popover__progress .progress-line {
    height: 8px !important;
    border-radius: 0 !important;
    width: 100% !important;
    background-color: #152f5d !important;
  }

  .project-popover__progress .progress-line::after {
    height: 8px !important;
    border-radius: 0px !important;
    box-shadow: 1px 0px 1px rgba(0,0,0,0.4) !important;
  }

  .project-popover__progress .progress-line::before {
    height: 8px !important;
    border-radius: 0 !important;
  }  

  .project-popover__progress .progress-line div {
    right: 0px !important;
    top: 0px !important;
    height: 8px !important;
    border-radius: 0 !important;
    background: #09112b !important;
  }

  .project-popover__epics {
    padding: 15px;
    width: 500px;
    overflow: hidden;
  }

  .project-popover__epic {
    min-height: 20px;
    position: relative;
    margin-bottom: 15px;
    font-weight: bold;
  }
  
  .project-popover__epic:last-child {
    margin-bottom: 0;
  }

  .project-popover__epic__name {
    width: 300px;    
    word-break: normal;
    text-align: left;
  }

  .project-popover__epic__effort {
    width: 70px;
    position: absolute;
    left: 320px;
    top: 0;
    color: #64a0b0;
  }

  .project-popover__epic__status {
    width: 80px;
    position: absolute;
    right: 0;
    top: 0;
    text-align: right;
  }

  .project-popover__epic.health-bad .project-popover__epic__status,
  .project-popover.health-bad .project-popover__header__progress {
    color: rgb(230, 57, 57);
  }

  .project-popover__epic.health-normal .project-popover__epic__status {
    color: #fff;
  }

  .project-popover__epic.health-good .project-popover__epic__status {
    color: #d7df20;
  }

  .project-popover__epic.health-best .project-popover__epic__status,
  .project-popover.health-good .project-popover__header__progress {
    color: #32d17e;
  }

  .project-popover__epic.health-forget .project-popover__epic__status {
    color: #64a0b0;
  }  

  .project-popover.health-normal .project-popover__header__progress {
    color: #405eb8;
  }    
  
</style>
