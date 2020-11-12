import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { useSelector, useDispatch } from 'react-redux'
import { editOrCreateProfile, modalHandler } from '../../../store/actions/profiles'
import { removeAllAlerts } from '../../../store/actions/alerts'
import { activitySectors } from '../../../utils/constants'
import { GrFacebook } from 'react-icons/gr'
import { FaTwitter } from 'react-icons/fa'
import { AiFillLinkedin } from 'react-icons/ai'
import { IoLogoYoutube } from 'react-icons/io'
import { AiFillInstagram } from 'react-icons/ai'
import Alert from '../../layout/Alert'


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(5, 4, 2),
        height: '90%',
        maxWidth: '70%',
        overflow: 'scroll'
    }
}));

const EditProfile = () => {

    const classes = useStyles();
    const modal = useSelector(state => state.profiles.modalOpened);
    const linkedin = useSelector(state => state.auth.linkedinToken);

    const profile = useSelector(state => state.profiles.myProfile);
    const [social, setSocial] = useState(false);
    const [preview, setPreview] = useState("");
    const initialData = {
        activitySector: '',
        company: '',
        website: '',
        photo: '',
        bio: '',
        skills: '',
        youtube: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        facebook: ''
    };
    const [formData, setFormData] = useState(initialData);
    const dispatch = useDispatch();

    const handleFiles = e => {
        let img;

        if (e.target.value.startsWith('http')) {
            if (e.target.value.length == 0) { return }

            img = (<img src={e.target.value} style={{ width: '100%' }} alt='' />);
            setPreview(img);
        } else {
            const files = e.target.files;

            if (files.length) {
                let file = files[0];
                setFormData({ ...formData, image: file });

                let reader = new FileReader();
                let img = (<img file={file} alt='' class="obj" />);

                reader.onload = (function (aImg) {
                    return function (e) {
                        aImg = (<img src={e.target.result} style={{ width: '100%' }} alt='' />)
                        setPreview(aImg);
                    };
                })(img);

                reader.readAsDataURL(file);
            }
        }
    }

    const submitHandler = async e => {
        e.preventDefault();
        await dispatch(removeAllAlerts());
        return dispatch(editOrCreateProfile(formData, modal.kind));
    }


    return (
        <div>
            <Modal
                className={classes.modal}
                open={modal.state}
                onClose={() => (modal.kind === 'edit') && dispatch(modalHandler(false, 'edit'))}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modal.state}>
                    <div className={classes.paper}>
                        <div style={{ margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                            <div>
                                <h3 className='text-primary'>Tell us more about yourself</h3>
                            </div>
                            <Alert />
                            <small>* = required field</small>
                            <div style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px' }} >
                                <form className="form">
                                    <div className="form-group">
                                        <select
                                            className="profile-inputs"
                                            name="activitySector"
                                            onChange={e => setFormData({ ...formData, activitySector: e.target.value })}
                                            defaultValue={profile?.activitySector}
                                        >
                                            {!formData.activitySector && <option>* Select your main activity sector</option>}
                                            {activitySectors.map(sector => (
                                                <Fragment key={sector}>
                                                    <option value={sector}>{sector}</option>
                                                </Fragment>
                                            ))}
                                        </select>
                                        <small className="form-text">Give us an idea of your field of work</small>
                                    </div>
                                    {!linkedin && (
                                        <div className="form-group">
                                            <input
                                                className="profile-inputs"
                                                type="file"
                                                onChange={e => handleFiles(e)}
                                                name="photo"
                                                id="photo"
                                                size="20"
                                            />
                                            <small className="form-text">Select a photo from your local files</small>
                                            <input
                                                className="profile-inputs"
                                                type="text"
                                                onChange={e => setFormData({ ...formData, photo: e.target.value })}
                                                onBlur={e => handleFiles(e)}
                                                name="photo"
                                                id="photo2"
                                                size="20"
                                                placeholder="http://website.com/someImage.jpg"
                                            />
                                            <small className="form-text">Or from the web...</small>
                                            <div>
                                                <label htmlFor="photo">
                                                    <div className='preview' id="preview">{preview}</div>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <input
                                            className="profile-inputs"
                                            type="text"
                                            placeholder={profile?.company ?? "* Company"}
                                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                                            name="company"
                                        />
                                        <small className="form-text">Could be your own company or one you work for</small>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="profile-inputs"
                                            type="text"
                                            placeholder={profile?.position ?? "Position"}
                                            onChange={e => setFormData({ ...formData, position: e.target.value })}
                                            name="position"
                                        />
                                        <small className="form-text">Your position in the above-mentioned company</small>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="profile-inputs"
                                            type="text"
                                            placeholder={profile?.website ?? "website"}
                                            onChange={e => setFormData({ ...formData, website: e.target.value })}
                                            name="website"
                                        />
                                        <small className="form-text">Could be your own or a company website</small>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="profile-inputs"
                                            type="text"
                                            placeholder={profile?.skills ?? "* Skills"}
                                            name="skills"
                                            onChange={e => setFormData({ ...formData, skills: e.target.value })}
                                        />
                                        <small className="form-text">Please use comma separated values (eg.
                                        advertisement,e-commerce,teaching,front-end-web-development)</small>
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            placeholder={profile?.bio ?? "A short bio of yourself"}
                                            rows="5"
                                            cols="50"
                                            name="bio"
                                            style={{ marginTop: 10 }}
                                            onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                        >
                                        </textarea>
                                        <small className="form-text">Tell us a little about yourself</small>
                                    </div>

                                    <div id="social-networks-toggler">
                                        <button
                                            style={{ marginRight: '10px' }}
                                            type="button"
                                            className="btn btn-info"
                                            onClick={() => setSocial(!social)}
                                        >
                                            Add Social Network Links
                                </button>
                                        <span>Optional</span>
                                    </div>

                                    {social && (
                                        <div id='social-networks-container'>
                                            <div className="form-group social-input">
                                                <FaTwitter size='25' style={{ marginRight: '5px' }} />
                                                <input
                                                    className="profile-inputs"
                                                    type="text"
                                                    placeholder={profile?.twitter ?? "Twitter URL"}
                                                    name="twitter"
                                                    onChange={e => setFormData({ ...formData, twitter: e.target.value })}
                                                />
                                            </div>

                                            <div className="form-group social-input">
                                                <GrFacebook size='25' style={{ marginRight: '5px' }} />
                                                <input
                                                    className="profile-inputs"
                                                    type="text"
                                                    placeholder={profile?.facebook ?? "Facebook URL"}
                                                    name="facebook"
                                                    onChange={e => setFormData({ ...formData, facebook: e.target.value })}
                                                />
                                            </div>

                                            <div className="form-group social-input">
                                                <IoLogoYoutube size='25' style={{ marginRight: '5px' }} />
                                                <input
                                                    className="profile-inputs"
                                                    type="text"
                                                    placeholder={profile?.youtube ?? "YouTube URL"}
                                                    name="youtube"
                                                    onChange={e => setFormData({ ...formData, youtube: e.target.value })}
                                                />
                                            </div>

                                            <div className="form-group social-input">
                                                <AiFillLinkedin size='25' style={{ marginRight: '5px' }} />
                                                <input
                                                    className="profile-inputs"
                                                    type="text"
                                                    placeholder={profile?.linkedin ?? "Linkedin URL"}
                                                    name="linkedin"
                                                    onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                                                />
                                            </div>

                                            <div className="form-group social-input">
                                                <AiFillInstagram size='25' style={{ marginRight: '5px' }} />
                                                <input
                                                    className="profile-inputs"
                                                    type="text"
                                                    placeholder={profile?.instagram ?? "Instagram URL"}
                                                    name="instagram"
                                                    onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>
                            <div style={{ alignSelf: 'flex-end' }} >
                                {modal.kind === 'edit' && (<button
                                    className="btn btn-light btn-lg"
                                    type="button"
                                    onClick={() => dispatch(modalHandler(false, 'edit'))}
                                    style={{ marginRight: '15px' }}
                                >
                                    Cancel
                                </button>)}
                                <button
                                    className="btn btn-primary btn-lg"
                                    type="button"
                                    onClick={e => submitHandler(e)}
                                    style={{ marginRight: '10px' }}
                                >
                                    Save
                            </button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}


export default EditProfile
