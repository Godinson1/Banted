import React, {useState,Component} from 'react';
import { Upload, Icon, Modal, Button } from 'antd';


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class pictureWall extends Component {

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    banters: []
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };


  handleChange = ({ fileList }) => {
      let array = [];
      this.setState({ fileList });
      this.state.fileList.map(item => {
          array.push(item.name);
      });
      console.log(array);
      console.log(`See your data here: ${array}`);
  }

 handleBanterImages = (e) => {
    let newarray = [];
      this.state.fileList.map(item => {
          newarray.push(item.name);
      });
    const formData = new FormData;
    formData.append('banterImage', newarray, newarray.name);
    //setBanterImage(formData);
    console.log(newarray);
    console.log(`Oya ewo data ni: ${formData}`);
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          multiple
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <div>
        <Button fileList={fileList} onClick={this.handleBanterImages}>Upload</Button>
      </div>
      </div>
    );
  }
}

export default pictureWall