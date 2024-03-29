import Feature_Group_References from "api/rest/Feature_Group_References";
import Features from "api/rest/Features";
import Group_References from "api/rest/Group_References";
import Groups from "api/rest/Groups";
import User_Groups from "api/rest/User_Groups";
import Users from "api/rest/Users";
import CarbonORM from "CarbonORM";
import Popup from "pages/UI/MaterialUI/components/Popup/Popup";
import React, {ChangeEvent} from "react";
// nodejs library to set properties for components
// nodejs library that concatenates classes
import GridContainer from "pages/UI/MaterialUI/components/Grid/GridContainer";
import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";
import Button from "pages/UI/MaterialUI/components/CustomButtons/Button";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage";
// Sections for this page
import axiosInstance from "variables/axiosInstance";


import Card from "pages/UI/MaterialUI/components/Card/Card";
import CardHeader from "pages/UI/MaterialUI/components/Card/CardHeader";
import CardBody from "pages/UI/MaterialUI/components/Card/CardBody";
import Table from "pages/UI/MaterialUI/components/Table/Table";
import axios from "axios";
import {
    C6,
    iFeature_Group_References,
    iFeatures,
    iGroups,
    iUser_Groups,
    iUsers
} from "api/rest/C6";
import CustomInput from "pages/UI/MaterialUI/components/CustomInput/CustomInput";
import swal from '@sweetalert/with-react';
import withStyles from "@material-ui/core/styles/withStyles";


interface UserAccessControl extends iUsers {
    group_name?: string,
    feature_code?: string
}

interface iGroupFeatures extends iGroups, iFeatures {
    allowed_to_grant_group_id?: string;
}


class AccessControl extends React.Component<{
    classes: any,
}, {
    currency: 'USD' | 'GBP' | 'EUR' | 'PLN',
    grantRolesModalOpen: boolean,
    createRolesAndAssignModalOpen: boolean,
    users?: Array<UserAccessControl>,
    features?: Array<iFeatures>,
    groups?: Array<iGroupFeatures>,
    alert?: any,
    role?: string,
    feature: iFeatures,
    group: iGroupFeatures,
    user: UserAccessControl,
}> {
    constructor(props) {
        super(props);
        this.state = {
            currency: 'EUR',
            grantRolesModalOpen: false,
            createRolesAndAssignModalOpen: true,
            users: [],
            alert: null,
            features: [],
            groups: [],
            group: {},
            feature: {},
            user: {}
        };

        this.newFeature = this.newFeature.bind(this);
        this.newGroup = this.newGroup.bind(this);
        this.renameGroup = this.renameGroup.bind(this);

    }

    handleChange = event => {
        this.setState({
            currency: event.target.value
        });
    };

    handleModalChange = () => {
        this.setState({
            grantRolesModalOpen: !this.state.grantRolesModalOpen
        })
    };

    handleNatModalChange = () => {
        this.setState({
            createRolesAndAssignModalOpen: !this.state.createRolesAndAssignModalOpen
        })
    };

    componentDidMount() {

        axiosInstance.get('/rest/' + C6.users.TABLE_NAME, {
            params: {
                [C6.SELECT]: [
                    C6.users.USER_USERNAME,
                    C6.users.USER_FIRST_NAME,
                    C6.users.USER_LAST_NAME,
                    C6.users.USER_ID,
                    [C6.GROUP_CONCAT, C6.features.FEATURE_CODE],
                    [C6.GROUP_CONCAT, C6.groups.GROUP_NAME]
                ],
                [C6.JOIN]: {
                    [C6.LEFT]: {
                        [C6.user_groups.TABLE_NAME]: [
                            C6.users.USER_ID,
                            C6.user_groups.USER_ID
                        ],
                        [C6.groups.TABLE_NAME]: [
                            C6.user_groups.GROUP_ID,
                            C6.groups.ENTITY_ID
                        ],
                        [C6.feature_group_references.TABLE_NAME]: [
                            C6.groups.ENTITY_ID,
                            C6.feature_group_references.GROUP_ENTITY_ID
                        ],
                        [C6.features.TABLE_NAME]: [
                            C6.features.FEATURE_ENTITY_ID,
                            C6.feature_group_references.FEATURE_ENTITY_ID
                        ]
                    }
                },
                [C6.GROUP_BY]: [
                    C6.users.USER_ID
                ],
                [C6.PAGINATION]: {
                    [C6.LIMIT]: 100
                }
            }
        }).then(response => this.setState({users: (response.data.rest || [])}));

        axios.get('/rest/' + C6.features.TABLE_NAME)
            .then(response => this.setState({features: (response.data.rest || [])}));

        axios.get('/rest/' + C6.groups.TABLE_NAME, {
            params: {
                [C6.SELECT]: [
                    C6.groups.ENTITY_ID,
                    C6.groups.GROUP_NAME,
                    [C6.GROUP_CONCAT, C6.features.FEATURE_CODE],
                    [C6.GROUP_CONCAT, C6.group_references.ALLOWED_TO_GRANT_GROUP_ID]
                ],
                [C6.JOIN]: {
                    [C6.LEFT]: {
                        [C6.group_references.TABLE_NAME]: [
                            C6.group_references.GROUP_ID,
                            C6.groups.ENTITY_ID
                        ],
                        [C6.feature_group_references.TABLE_NAME]: [
                            C6.groups.ENTITY_ID,
                            C6.feature_group_references.GROUP_ENTITY_ID
                        ],
                        [C6.features.TABLE_NAME]: [
                            C6.features.FEATURE_ENTITY_ID,
                            C6.feature_group_references.FEATURE_ENTITY_ID
                        ]
                    }
                },
                [C6.GROUP_BY]: [
                    C6.groups.ENTITY_ID
                ],
                [C6.PAGINATION]: {
                    [C6.LIMIT]: 100
                }
            }
        }).then(response => this.setState({groups: response.data.rest}))
    }

    deleteFeatureFromGroup(groupId: string | undefined, featureId: string | undefined) {
        Feature_Group_References.Delete({
            [C6.WHERE]: {
                [C6.feature_group_references.FEATURE_ENTITY_ID]: featureId,
                [C6.feature_group_references.GROUP_ENTITY_ID]: groupId,
            }
        })

    }

    deleteGroupFromUser(userId: string | undefined, groupId: string | undefined) {

        axiosInstance.delete('/rest/' + C6.user_groups.TABLE_NAME, {
            data: {
                [C6.WHERE]: {
                    [C6.user_groups.GROUP_ID]: userId,
                    [C6.user_groups.USER_ID]: groupId,
                }
            }
        })
            .then(() => this.setState({
                users: this.state.users?.map(obj => {
                    if (obj.user_id !== userId) {
                        return obj;
                    }
                    const fullGroup: undefined | iGroupFeatures =
                        this.state.groups?.find((group: iGroupFeatures) => group.entity_id === groupId);

                    let regex = new RegExp('(^|,)' + fullGroup?.group_name + ',?', 'g');

                    obj.group_name = obj.group_name?.replace(regex, ',');

                    return obj;
                })
            }))
    }

    newGroupGrantabillity(modifyGroupId: string | undefined, allowGroupGrantRightsId: string | undefined) {
        Group_References.Post({
            group_id: modifyGroupId,
            allowed_to_grant_group_id: allowGroupGrantRightsId,
        })
    }

    deleteGroupGrantabillity(modifyGroupId: string | undefined, allowGroupGrantRightsId: string | undefined) {
        Group_References.Delete({
            [C6.WHERE]: {
                [C6.group_references.GROUP_ID]: modifyGroupId,
                [C6.group_references.ALLOWED_TO_GRANT_GROUP_ID]: allowGroupGrantRightsId,
            }
        })

    }

    newFeature() {

        console.log('this.state.feature', this.state.feature);

        // this.setState({alert: null}, () => Features.Post(this.state.feature))
    }

    deleteFeature(id: string | undefined) {
        this.setState({alert: null}, () => Features.Delete({
            feature_entity_id: id
        }))
    }

    newUser() {
        this.setState({alert: null}, () => Users.Post(this.state.user))
    }

    newGroup() {
        let id = '';
        this.setState({alert: null}, () => Groups.Post({
            group_name: this.state.group.group_name,
            entity_id: id
        }));
    }


    renameGroup(newName: string | undefined) {
        let id = '';
        this.setState({alert: null}, () => Groups.Put({
            group_name: newName,
            entity_id: id
        }));
    }


    deleteGroup(id: string) {
        this.setState({alert: null}, () => Groups.Delete({
            entity_id: id
        }))
    }

    addFeatureToGroup(featureId: string | undefined, groupId: string | undefined) {

        const payload: iFeature_Group_References = {
            feature_entity_id: featureId,
            group_entity_id: groupId
        };

        this.setState({alert: null}, () => Feature_Group_References.Post(payload));
    }

    addUserToGroup(userId: string | undefined, groupId: string | undefined) {

        const payload: iUser_Groups = {
            group_id: groupId,
            user_id: userId
        };
        this.setState({alert: null}, () => User_Groups.Post(payload));
    }


    render() {
        const {alert, features} = this.state;
        const {classes} = this.props;

        console.log("features", features);


        function humanize(str) {
            let i, frags = str.split('_');
            for (i = 0; i < frags.length; i++) {
                frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
            }
            return frags.join(' ');
        }

        return (
            <div>
                <GridItem lg={12} md={12} sm={12}>
                    {alert}
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card className={classes.whiteOpacity}>
                                <CardHeader color="info">
                                    <h4 className={classes.cardTitleWhite}>Assignable Roles Table</h4>
                                    <p className={classes.cardCategoryWhite}>
                                        The roles created here can be assigned to users you manage
                                    </p>
                                    <Button
                                        color="success"
                                        onClick={() => {

                                            this.setState({
                                                alert: <Popup handleClose={() => this.setState({alert: null})}>
                                                    <div>
                                                        <h2>Create a new feature flag</h2>
                                                        <b>(Site Admin Only)</b>
                                                        <br/><br/>
                                                        Your New Feature Name:
                                                        <hr/>
                                                        <input
                                                            id="Feature_Flag_Name"
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {

                                                                console.log('feature_entity_id', e, {
                                                                    feature_code: e.target.value,
                                                                    feature_entity_id: undefined,
                                                                })

                                                                this.setState({
                                                                    feature: {
                                                                        feature_code: e.target.value,
                                                                        feature_entity_id: undefined,
                                                                    }
                                                                })
                                                            }}
                                                        />
                                                        <br/>
                                                        <hr/>
                                                    </div>
                                                </Popup>
                                            })

                                        }}>
                                        Start New Feature
                                    </Button>
                                    <Button color="warning"
                                            onClick={() =>
                                                swal({
                                                    buttons: true,
                                                    content:
                                                        <div>Create a permission group <br/>
                                                            Your New Group Name:
                                                            <hr/>
                                                            <CustomInput
                                                                success
                                                                labelText="Permissions Group Name"
                                                                id="Permissions_Group_Name"
                                                                formControlProps={{
                                                                    fullWidth: true
                                                                }}
                                                                inputProps={{
                                                                    onChange: (e: ChangeEvent<HTMLInputElement>) => this.setState({
                                                                        group: {
                                                                            ...this.state.group,
                                                                            group_name: e.target.value,
                                                                            created_by: CarbonORM.instance.state.user_id
                                                                        }
                                                                    })
                                                                }}
                                                            />
                                                            <br/>
                                                            <hr/>
                                                        </div>
                                                }).then(shouldSubmit => shouldSubmit && this.newGroup())
                                            }>Create New Group</Button>
                                </CardHeader>
                                <CardBody>
                                    <Table
                                        tableHeaderColor="info"
                                        tableHead={["Group Name", ...(features?.map((feature: iFeatures, index: number) =>
                                            <p
                                                onClick={() => swal({
                                                    dangerMode: true,
                                                    buttons: {
                                                        rename: "Rename Feature",
                                                        delete: "Delete Feature",
                                                        cancel: "Close Options"
                                                    },
                                                    content: <GridContainer>
                                                        <GridItem xs={12} sm={12} md={12}>
                                                            <div>
                                                                <h5><b>Modifying a feature is extremely dangerous.
                                                                </b></h5>
                                                                <br/>
                                                                <p>Features are typically hardcoded in the codebase to
                                                                    be validated for existence on
                                                                    request.
                                                                    Renaming or deleting a feature may cause users to be
                                                                    unable to access critical site
                                                                    functionality.
                                                                    When a feature is designated as critical, or even
                                                                    just used at all, it should be
                                                                    &apos;restfully&apos; validated so it may not be
                                                                    removed or updated.
                                                                </p>
                                                            </div>
                                                        </GridItem>
                                                    </GridContainer>
                                                }).then(value => {
                                                    switch (value) {
                                                        case "delete":
                                                            swal({
                                                                title: "Are you sure?",
                                                                text: "Once deleted, accounts will have the group association, thereby site permissions, removed!",
                                                                icon: "warning",
                                                                buttons: true,
                                                                dangerMode: true,
                                                            })
                                                                .then((willDelete) => {
                                                                    if (willDelete) {
                                                                        this.deleteFeature(feature.feature_entity_id)
                                                                    } else {
                                                                        swal("Canceled");
                                                                    }
                                                                });
                                                            break;
                                                        default:
                                                        case "rename":
                                                            swal({
                                                                title: "Are you sure?",
                                                                text: "Once deleted, accounts will have the group association, thereby site permissions, removed!",
                                                                icon: "warning",
                                                                buttons: true,
                                                                dangerMode: true,
                                                            })
                                                                .then((willDelete) => {
                                                                    if (willDelete) {
                                                                        this.renameGroup(feature.feature_entity_id)
                                                                    } else {
                                                                        swal("todo "); // todo - rename group
                                                                    }
                                                                });
                                                            break;
                                                        case "cancel":
                                                            break;
                                                    }
                                                })}
                                                key={index}>{humanize(feature.feature_code)}</p>) ?? []), "Admin"]}
                                        tableData={
                                            this.state.groups?.map((group, key) => {
                                                const name = humanize(group.group_name);
                                                return [
                                                    <p key={key} onClick={this.handleNatModalChange}>{name}</p>,
                                                    ...(this.state.features?.map((feature) => {

                                                        const enabled = group.feature_code?.includes(',' + feature.feature_code + ',')
                                                            || group.feature_code?.startsWith(feature.feature_code + ',')
                                                            || group.feature_code?.includes(',' + feature.feature_code)
                                                            || group.feature_code === feature.feature_code;

                                                        return <Button key={key} color={enabled ? "success" : "default"}
                                                                       onClick={() => enabled
                                                                           ? this.deleteFeatureFromGroup(group.entity_id, feature.feature_entity_id)
                                                                           : this.addFeatureToGroup(feature.feature_entity_id, group.entity_id)}>
                                                            {enabled ? " Enabled " : "Disabled"}
                                                        </Button>
                                                    }) ?? []),
                                                    <Button key={key} onClick={() => swal({
                                                            dangerMode: true,
                                                            buttons: {
                                                                delete: "Delete Group",
                                                                cancel: "Close Admin Settings"
                                                            },
                                                            content:
                                                                <GridContainer>
                                                                    <GridItem xs={12} sm={12} md={12}>
                                                                        <div>
                                                                            <h5><b>You will be affecting 9 users already
                                                                                assigned to this role.</b></h5>
                                                                            <br/>
                                                                            <p>Moving to the Grant Ability.... will allow
                                                                                this user to... create and manage
                                                                                other users...</p>
                                                                        </div>
                                                                        <Table
                                                                            tableHeaderColor="info"
                                                                            tableHead={["Group #", "Group Name", "Grantability Status"]}
                                                                            tableData={
                                                                                this.state.groups?.map((SubGroup, key) => {

                                                                                    let regex = new RegExp('(^|,)' + SubGroup.entity_id + ',?', 'g');

                                                                                    let enabled = regex.test(group.allowed_to_grant_group_id ?? '');

                                                                                    return [
                                                                                        key,
                                                                                        SubGroup.group_name,
                                                                                        <Button key={key}
                                                                                                color={enabled ? "success" : "default"}
                                                                                                onClick={() => enabled ?
                                                                                                    this.deleteGroupGrantabillity(group.entity_id, SubGroup.entity_id) :
                                                                                                    this.newGroupGrantabillity(group.entity_id, SubGroup.entity_id)}>
                                                                                            {enabled ? " Can Give Access " : "Can not Grant"}
                                                                                        </Button>
                                                                                    ]
                                                                                })
                                                                            }
                                                                        />
                                                                    </GridItem>
                                                                </GridContainer>
                                                        }
                                                    ).then((value) => {
                                                        switch (value) {
                                                            case "delete":
                                                                swal({
                                                                    title: "Are you sure?",
                                                                    text: "Once deleted, accounts will have the group association, thereby site permissions, removed!",
                                                                    icon: "warning",
                                                                    buttons: true,
                                                                    dangerMode: true,
                                                                })
                                                                    .then(willDelete => {
                                                                        if (willDelete) {
                                                                            swal("TODO - remove row!", {
                                                                                icon: "success",
                                                                            });
                                                                        } else {
                                                                            swal("Canceled");
                                                                        }
                                                                    });
                                                                break;
                                                            default:
                                                            case "cancel":
                                                                break;
                                                        }
                                                    })} color="danger">Admin</Button>
                                                ]
                                            })
                                        }
                                    />
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card className={classes.whiteOpacity}>
                                <CardHeader color="info">
                                    <h4 className={classes.cardTitleWhite}>
                                        Create New Users
                                    </h4>
                                    <p className={classes.cardCategoryWhite}>
                                        Create and assign new users access to connect features
                                    </p>

                                    <Button
                                        color="success"
                                        onClick={() => swal({
                                            buttons: true,
                                            content:
                                                <form>
                                                    <h2>Create a new user</h2><br/>
                                                    <hr/>
                                                    <CustomInput
                                                        success
                                                        labelText="First Name"
                                                        id="user_first_name"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            onChange: (e: ChangeEvent<HTMLInputElement>) => this.setState({
                                                                user: {
                                                                    ...this.state.user,
                                                                    user_first_name: e.target.value
                                                                }
                                                            })
                                                        }}
                                                    />
                                                    <CustomInput
                                                        success
                                                        labelText="Last Name"
                                                        id="user_last_name"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            onChange: (e: ChangeEvent<HTMLInputElement>) => this.setState({
                                                                user: {
                                                                    ...this.state.user,
                                                                    user_last_name: e.target.value
                                                                }
                                                            })
                                                        }}
                                                    />
                                                    <CustomInput
                                                        success
                                                        labelText="Username"
                                                        id="user_username"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            onChange: (e: ChangeEvent<HTMLInputElement>) => this.setState({
                                                                user: {
                                                                    ...this.state.user,
                                                                    user_username: e.target.value
                                                                }
                                                            })
                                                        }}
                                                    />
                                                    <CustomInput
                                                        success
                                                        labelText="Password"
                                                        id="user_password"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            onChange: (e: ChangeEvent<HTMLInputElement>) => this.setState({
                                                                user: {
                                                                    ...this.state.user,
                                                                    user_password: e.target.value
                                                                }
                                                            })
                                                        }}
                                                    />
                                                    <CustomInput
                                                        success
                                                        labelText="Email"
                                                        id="user_email"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            onChange: (e: ChangeEvent<HTMLInputElement>) => this.setState({
                                                                user: {
                                                                    ...this.state.user,
                                                                    user_email: e.target.value
                                                                }
                                                            })
                                                        }}
                                                    />
                                                    <hr/>
                                                </form>
                                        }).then(shouldSubmit => shouldSubmit && this.newUser())}
                                    >
                                        Create New User
                                    </Button>

                                </CardHeader>
                                <CardBody>
                                    <Table
                                        tableHeaderColor="info"
                                        tableHead={[
                                            "User ID",
                                            "First Name",
                                            "Last Name",
                                            "Username/Session",
                                            ...(this.state.groups?.map(group => group.group_name) ?? [])
                                        ]}
                                        tableData={
                                            this.state.users?.map((user, key) => [
                                                user.user_id,
                                                user.user_first_name,
                                                user.user_last_name,
                                                user.user_username,
                                                ...(this.state.groups?.map(group => {

                                                    const enabled = user.group_name?.includes(',' + group.group_name + ',')
                                                        || user.group_name?.startsWith(group.group_name + ',')
                                                        || user.group_name?.includes(',' + group.group_name)
                                                        || user.group_name === group.group_name;

                                                    return <Button key={key} color={enabled ? "success" : "default"}
                                                                   onClick={() => enabled ?
                                                                       this.deleteGroupFromUser(user.user_id, group.entity_id) :
                                                                       this.addUserToGroup(user.user_id, group.entity_id)}
                                                    >
                                                        {enabled ? " Enabled " : "Disabled"}
                                                    </Button>
                                                }) ?? [])
                                            ])
                                        }
                                    />
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </GridItem>
            </div>
        );
    }
}


export default withStyles(landingPageStyle)(AccessControl);
