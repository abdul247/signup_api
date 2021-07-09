const commonModel = {};
const commonFun = require('../helpers/commonFun');
//***** Insert query start *****//
commonModel.insert = (table, data) => {
    var que = "INSERT INTO " + table + " SET ?";
    return commonFun.runSqlQueryWithData(que, data);
}
//***** Insert query end *****//

//***** Select all query start *****//
commonModel.selectAll = (table) => {
    let que = "SELECT * FROM " + table;
    return commonFun.runSQLquery(que);
}
//***** Select all query end *****//


//***** Select all order by query start *****//
commonModel.selectAllOrderBy = (table, orderBy, action) => {
    let que = "SELECT * FROM " + table + "ORDER BY " + orderBy + action;
    return commonFun.runSQLquery(que);
}
//***** Select all order by query end *****//

//***** Select all where query start *****//
commonModel.selectAllWhere = (table, obj) => {
    let que = "SELECT * FROM  " + table + " WHERE ";
    let counter = 1;
    for (let k in obj) {
        if (counter == 1) {
            que += k + "= '" + obj[k] + "'";
        } else {
            que += " AND " + k + "= '" + obj[k] + "' ";

        }
        counter++;
    }
    return commonFun.runSQLquery(que);
}
//***** Select all where query end *****//

commonModel.update = (table, obj, where) => {

    let que = "UPDATE " + table + " SET ";
    let counter = 1;
    for (let k in obj) {
        if (counter == 1) {
            que += k + " = '" + obj[k] + "'"
        } else {
            que += ", " + k + " = '" + obj[k] + "'"
        }
        counter++;
    }
    let key = Object.keys(where);
    que += " WHERE ";
    let counter01 = 1;
    for (let k of key) {
        if (counter01 == 1) {
            que += k + "= '" + where[k] + "'";
        } else {
            que += " AND " + k + " = '" + where[k] + "' ";
        }
        counter01++;
    }
    return commonFun.runSQLquery(que);
}
//***** Update query end *****//





// //*****  Get all basic tab list start *****//
// commonModel.getLastRISEntry = () => {
//     let que = "SELECT * FROM request_information_services WHERE id=(SELECT max(id) FROM request_information_services)"
//     return commonFun.runSQLquery(que);
// }
// //***** Get all basic tab list end *****//

// //*****  Get all basic tab list start *****//
// commonModel.getAllBasicTabList = (id) => {
//     let que = "SELECT ris.id,ris.scheduler_id, ris.status, ris.cell_phone, ais.client_name, ais.notes, ais.address, ais.latitude, ais.longitude, ais.entered_by, ais.requested_by, ais.request_date, ais.platform, ais.assignment_type, ais.phone_code, ais.how_many_receivers, ais.ir, ais.assignment_date, ais.from_time, ais.to_time, ais.recurrent_assignment, ais.contact_name, ais.building_name, ais.building_address, ais.room, ais.repeats, ais.event_at, ais.event_start_date, ais.event_end_date, ais.event_start_time, ais.event_end_time, ais.every, ais.event_duration FROM request_information_services as ris LEFT JOIN appointment_information_services as ais ON ris.id = ais.ris_id WHERE ris.id = ais.ris_id AND ris.scheduler_id =" + id + " ORDER BY id DESC "
//     return commonFun.runSQLquery(que);
// }
// //***** Get all basic tab list end *****//


// //*****  Get request details start *****//
// commonModel.getRequestDetails = (id) => {
//     // let que = "SELECT ris.id,ris.scheduler_id,ris.caseworker_name, ir.is_reject AS ir_isReject, ris.type, ris.business_bill, ris.requester_name, ris.health_department, ris.north_metro_community_service, ris.human_services, ris.ahs_department, ris.office_phone, ris.cell_phone, ris.email, ris.site_contact, ris.human_services, ris.status, DATE_FORMAT(ais.created_at, '%d-%m-%Y') as created_date, ris.is_reject, ais.case_name, ais.client_name, ais.name_of_contact_person, ais.cell_phone as cellphone_contact_person, ais.name_of_person, ais.vci_opi_phone_code, ais.vci_opi_cell_phone, ais.line, ais.doctor as name_of_provider, ais.patient, ais.address, ais.claim_number, ais.school_name, ais.trails, ais.appointment_type, ais.date,  ais.start_time, ais.anticipated_end_time, ais.service_requested, ais.receivers_required, ais.address, ais.language as language_id,languages.name as language, ais.latitude, ais.longitude, ais.notes, ais.entered_by, ais.requested_by, ais.request_date, ais.platform, ais.assignment_type, ais.phone_code, ais.how_many_receivers, ais.ir, ais.assignment_date, ais.from_time, ais.to_time, ais.lob, ais.recurrent_assignment, ais.building_name, ais.building_address, ais.room, ais.repeats, ais.event_at, ais.event_start_date, ais.event_start_time, ais.event_end_date, ais.event_end_time, ais.every, ais.event_duration, ais.practice_name, ais.provider_name, ais.caseworker_lastname, ais.position, ais.contact_person_cellphone, ais.contact_person_phone_code, ais.client_lastname, ais.client_firstname, ais.home_visit, ais.apt, ais.provider_address, ais.provider_latitude, ais.provider_longitude FROM request_information_services as ris LEFT JOIN appointment_information_services as ais ON ris.id = ais.ris_id LEFT JOIN languages ON languages.id = ais.language LEFT JOIN interpreter_request AS ir ON ir.job_id = ris.id WHERE ris.id = " + id;
//     // let que = "SELECT ris.id,ris.scheduler_id,ris.caseworker_name, ir.is_reject AS ir_isReject, ris.type, ris.business_bill, ris.requester_name, ris.health_department, ris.north_metro_community_service, ris.human_services, ris.ahs_department, ris.office_phone, ris.cell_phone, ris.email, ris.site_contact, ris.human_services, ris.status, DATE_FORMAT(ais.created_at, '%d-%m-%Y') as created_date, ris.is_reject, ais.case_name, ais.client_name, ais.name_of_contact_person, ais.cell_phone as cellphone_contact_person, ais.name_of_person, ais.vci_opi_phone_code, ais.vci_opi_cell_phone, ais.line, ais.doctor as name_of_provider, ais.patient, ais.address, ais.claim_number, ais.school_name, ais.trails, ais.appointment_type, ais.date,  ais.start_time, ais.anticipated_end_time, ais.service_requested, ais.receivers_required, ais.address, ais.language as language_id,languages.name as language, ais.latitude, ais.longitude, ais.notes, ais.entered_by, ais.requested_by, ais.request_date, ais.platform, ais.assignment_type, ais.phone_code, ais.how_many_receivers, ais.ir, ais.assignment_date, ais.from_time, ais.to_time, ais.lob, ais.recurrent_assignment, ais.building_name, ais.building_address, ais.room, ais.repeats, ais.event_at, ais.event_start_date, ais.event_start_time, ais.event_end_date, ais.event_end_time, ais.every, ais.event_duration, ais.practice_name, ais.provider_name, ais.caseworker_lastname, ais.position, ais.contact_person_cellphone, ais.contact_person_phone_code, ais.client_lastname, ais.client_firstname, ais.home_visit, ais.apt, ais.provider_address, ais.provider_latitude, ais.provider_longitude,user.email as client_email FROM request_information_services as ris LEFT JOIN appointment_information_services as ais ON ris.id = ais.ris_id LEFT JOIN languages ON languages.id = ais.language LEFT JOIN user  ON user.id = ris.client_id LEFT JOIN interpreter_request AS ir ON ir.job_id = ris.id WHERE ris.id = " + id;
//     let que = "SELECT ris.id,ris.scheduler_id,ris.caseworker_name, ir.is_reject AS ir_isReject, ris.type, ris.business_bill, ris.requester_name, ris.health_department, ris.north_metro_community_service, ris.human_services, ris.ahs_department, ris.office_phone, ris.cell_phone, ris.email, ris.site_contact, ris.human_services, ris.status, DATE_FORMAT(ais.created_at, '%d-%m-%Y') as created_date, ris.is_reject, ais.case_name, ais.client_name, ais.name_of_contact_person, ais.cell_phone as cellphone_contact_person, ais.name_of_person, ais.vci_opi_phone_code, ais.vci_opi_cell_phone, ais.line, ais.doctor as name_of_provider, ais.patient, ais.address, ais.claim_number, ais.school_name, ais.trails, ais.appointment_type, ais.date,  ais.start_time, ais.anticipated_end_time, ais.service_requested, ais.receivers_required, ais.address, ais.language as language_id,languages.name as language, ais.latitude, ais.longitude, ais.notes, ais.entered_by, ais.requested_by, ais.request_date, ais.platform, ais.assignment_type, ais.phone_code, ais.how_many_receivers, ais.ir, ais.assignment_date, ais.from_time, ais.to_time, ais.lob, ais.recurrent_assignment, ais.building_name, ais.building_address, ais.room, ais.repeats, ais.event_at, ais.event_start_date, ais.event_start_time, ais.event_end_date, ais.event_end_time, ais.every, ais.event_duration, ais.practice_name, ais.provider_name, ais.caseworker_lastname, ais.position, ais.contact_person_cellphone, ais.contact_person_phone_code, ais.client_lastname, ais.client_firstname, ais.home_visit, ais.apt, ais.building_address, ais.building_latitude, ais.building_longitude, ais.home_address, ais.home_latitude, ais.home_longitude, user.email as client_email FROM request_information_services as ris LEFT JOIN appointment_information_services as ais ON ris.id = ais.ris_id LEFT JOIN languages ON languages.id = ais.language LEFT JOIN user  ON user.id = ris.client_id LEFT JOIN interpreter_request AS ir ON ir.job_id = ris.id WHERE ris.id = " + id;
//     return commonFun.runSQLquery(que);
// }
// //***** Get request details end *****//

// //*****  Get request details start *****//
// commonModel.getRateSettingPlatforms = (id) => {
//     let que = "SELECT master_platform.* FROM master_platform LEFT JOIN interpreter_assignment_settings AS ias ON master_platform.id = ias.platform_id  WHERE ias.status = 1 AND Interpreter_id = " + id + " GROUP BY master_platform.id ";
//     return commonFun.runSQLquery(que);
// }
// //***** Get request details end *****//

// //*****  Get REQ code start *****//
// commonModel.getCode = () => {
//     let que = "SELECT * FROM master_code";
//     return commonFun.runSQLquery(que);
// }
// //***** Get REQ code end *****//

// //***** Get all interpreter request list start *****//
// commonModel.getAllInterpreterReqList = (id) => {
//     let que = "SELECT ris.id,ris.scheduler_id,ris.caseworker_name, ir.is_reject AS ir_isReject, ris.type, ris.business_bill, ris.requester_name, ris.health_department, ris.north_metro_community_service, ris.human_services, ris.ahs_department, ris.office_phone, ris.cell_phone, ris.email, ris.site_contact, ris.human_services, ris.status, DATE_FORMAT(ais.created_at, '%d-%m-%Y') as created_date, ris.is_reject, ais.case_name, ais.client_name, ais.name_of_contact_person, ais.cell_phone as cellphone_contact_person, ais.name_of_person, ais.doctor as name_of_provider, ais.patient, ais.address, ais.claim_number, ais.school_name, ais.trails, ais.appointment_type, ais.date,  ais.start_time, ais.anticipated_end_time, ais.service_requested, ais.receivers_required, ais.address, ais.language as language_id,languages.name as language, ais.latitude, ais.longitude, ais.notes, ais.entered_by, ais.requested_by, ais.request_date, ais.platform, ais.assignment_type, ais.phone_code, ais.how_many_receivers, ais.ir, ais.assignment_date, ais.from_time, ais.to_time, ais.lob, ais.recurrent_assignment, ais.building_name, ais.building_address, ais.room, ais.repeats, ais.event_at, ais.event_start_date, ais.event_start_time, ais.event_end_date, ais.event_end_time, ais.every, ais.event_duration, ais.practice_name, ais.provider_name, ais.caseworker_lastname, ais.position, ais.contact_person_cellphone, ais.contact_person_phone_code, ais.client_lastname, ais.client_firstname, ais.home_visit, ais.apt, ais.provider_address, ais.provider_latitude, ais.provider_longitude FROM request_information_services as ris LEFT JOIN appointment_information_services as ais ON ris.id = ais.ris_id LEFT JOIN languages ON languages.id = ais.language LEFT JOIN interpreter_request AS ir ON ir.job_id = ris.id WHERE ris.status = '1' AND ir.status = '0' AND pending_status = '0' AND accepted_by_other = '0' AND ir.Interpreter_id = '" + id + "'";
//     return commonFun.runSQLquery(que);
// }
// //***** Get all interpreter request list end*****//

// //***** Interpreter accept request start *****//
// commonModel.acceptByOther = (interpreter_id, request_id) => {
//     let que = "UPDATE interpreter_request SET accepted_by_other = '1' WHERE Interpreter_id != '" + interpreter_id + "' AND job_id = '" + request_id + "'";
//     return commonFun.runSQLquery(que);
// }

// commonModel.clientData = (id) => {
//     let que = "SELECT user.* FROM user LEFT JOIN request_information_services as ris ON user.id = ris.client_id WHERE ris.id = " + id;
//     return commonFun.runSQLquery(que);
// }

// commonModel.getRequest = (id) => {
//     let que = "SELECT * FROM request_information_services WHERE id = " + id;
//     return commonFun.runSQLquery(que);
// }
// //***** Interpreter accept request end *****//

// //***** Interpreter progress request start *****//
// commonModel.getInterpreterProgressReq = (id) => {
//     let que = "SELECT ris.id,ris.scheduler_id,ris.caseworker_name, ir.is_reject AS ir_isReject, ris.type, ris.business_bill, ris.requester_name, ris.health_department, ris.north_metro_community_service, ris.human_services, ris.ahs_department, ris.office_phone, ris.cell_phone, ris.email, ris.site_contact, ris.human_services, ris.status, DATE_FORMAT(ais.created_at, '%d-%m-%Y') as created_date, ris.is_reject, ais.case_name, ais.client_name, ais.name_of_contact_person, ais.cell_phone as cellphone_contact_person, ais.name_of_person, ais.doctor as name_of_provider, ais.patient, ais.address, ais.claim_number, ais.school_name, ais.trails, ais.appointment_type, ais.date,  ais.start_time, ais.anticipated_end_time, ais.service_requested, ais.receivers_required, ais.address, ais.language as language_id,languages.name as language, ais.latitude, ais.longitude, ais.notes, ais.entered_by, ais.requested_by, ais.request_date, ais.platform, ais.assignment_type, ais.phone_code, ais.how_many_receivers, ais.ir, ais.assignment_date, ais.from_time, ais.to_time, ais.lob, ais.recurrent_assignment, ais.building_name, ais.building_address, ais.room, ais.repeats, ais.event_at, ais.event_start_date, ais.event_start_time, ais.event_end_date, ais.event_end_time, ais.every, ais.event_duration, ais.practice_name, ais.provider_name, ais.caseworker_lastname, ais.position, ais.contact_person_cellphone, ais.contact_person_phone_code, ais.client_lastname, ais.client_firstname, ais.home_visit, ais.apt, ais.provider_address, ais.provider_latitude, ais.provider_longitude FROM request_information_services as ris LEFT JOIN appointment_information_services as ais ON ris.id = ais.ris_id LEFT JOIN languages ON languages.id = ais.language LEFT JOIN interpreter_request AS ir ON ir.job_id = ris.id WHERE ris.status = '2' AND ir.status = '1' AND pending_status = '1' AND accepted_by_other = '0' AND ir.Interpreter_id = '" + id + "'";
//     return commonFun.runSQLquery(que);
// };
// //***** Interpreter progress request end *****//

// //***** Interpreter progress request start *****//
// commonModel.getAssignRequest = (id) => {
//     let que = "SELECT * FROM interpreter_request WHERE job_id = " + id;
//     return commonFun.runSQLquery(que);
// }

// commonModel.requestRejectedByAllInterpreter = (id) => {
//     let que = "UPDATE request_information_services SET status = '4' WHERE id = '" + id + "'";
//     return commonFun.runSQLquery(que);
// }
// commonModel.requestRejectedReassign = (id) => {
//     let que = "UPDATE request_reject_history SET status = '1' WHERE request_id = '" + id + "'";
//     return commonFun.runSQLquery(que);
// }

// //***** Interpreter progress request end *****//

// commonModel.getDataByAssignmentDate = (date, time) => {

//     // let que = "SELECT * FROM appointment_information_services WHERE assignment_date = '" + date + "' AND to_time = '" + time + "'";
//     // let que = "SELECT * FROM appointment_information_services WHERE assignment_date = '" + date.assignment_date + "' AND to_time <= '" + date.to_time + "' AND to_time >= '" + date.to_time1 + "' GROUP BY id";
//     let que = "SELECT * FROM appointment_information_services WHERE assignment_date = '" + date.assignment_date + "' AND to_time BETWEEN '" + date.to_time + "' AND '" + date.to_time1 + "' GROUP BY id";
//     return commonFun.runSQLquery(que);
// }


// //***** Get Graph Details start *****//
// commonModel.getTotalUsers = (start, end) => {
//     let que = "SELECT COUNT(id) as Users FROM user WHERE role_id != 1";
//     if (start != 'undefined' && end != 'undefined') que += " AND create_dt BETWEEN '" + start + "' AND '" + end + "'";
//     return commonFun.runSQLquery(que);
// }

// commonModel.getTotalInterpreter = (start, end) => {
//     let que = "SELECT COUNT(id) as Interpreter FROM user WHERE role_id = 2 AND status = 1 AND profile_status = 1 ";
//     if (start != 'undefined' && end != 'undefined') que += " AND create_dt BETWEEN '" + start + "' AND '" + end + "'";
//     return commonFun.runSQLquery(que);
// }

// commonModel.getTotalLanguages = (start, end) => {
//     let que = "SELECT COUNT(id) as Languages FROM languages WHERE status = 1";
//     if (start != 'undefined' && end != 'undefined') que += " AND created_at BETWEEN '" + start + "' AND '" + end + "'";
//     return commonFun.runSQLquery(que);
// }

// commonModel.getTotalAllRequest = (start, end, role_id, user_id) => {
//     let que;
//     switch (role_id) {
//         case '1':
//         case '4':
//             que = "SELECT COUNT(ris.id) as AllRequest FROM request_information_services AS ris LEFT JOIN user ON ris.client_id = user.id WHERE user.status = 1";
//             break;
//         case '2':
//             que = "SELECT COUNT(ir.id) as AllRequest FROM interpreter_request AS ir LEFT JOIN request_information_services AS ris ON ir.job_id = ris.id LEFT JOIN user ON ir.Interpreter_id = user.id WHERE ir.Interpreter_id = '" + user_id + "' AND ir.accepted_by_other = '0' AND user.status = '1' AND user.profile_status = '1' ";
//             break;
//         case '3':
//             que = "SELECT COUNT(ris.id) as AllRequest FROM request_information_services AS ris LEFT JOIN user ON ris.client_id = user.id WHERE ris.client_id = '" + user_id + "' AND user.status = '1' ";
//             break;
//     }
//     if (start != 'undefined' && end != 'undefined') que += " AND ris.created_date BETWEEN '" + start + "' AND '" + end + "'";
//     return commonFun.runSQLquery(que);
// }

// commonModel.getTotalNewRequest = (start, end, role_id, user_id) => {
//     let que;
//     switch (role_id) {
//         case '1':
//         case '4':
//             que = "SELECT COUNT(ris.id) as NewRequest FROM request_information_services AS ris LEFT JOIN user ON ris.client_id = user.id WHERE user.status = 1 AND ris.status = 0";
//             break;
//         case '2':
//             que = "SELECT COUNT(ir.id) as NewRequest FROM interpreter_request AS ir LEFT JOIN request_information_services AS ris ON ir.job_id = ris.id LEFT JOIN user ON ir.Interpreter_id = user.id WHERE ir.Interpreter_id = '" + user_id + "' AND ir.status = 0 AND ir.pending_status = '0' AND ir.accepted_by_other = '0' AND user.status = '1' AND user.profile_status = '1' ";
//             break;
//         case '3':
//             que = "SELECT COUNT(ris.id) as NewRequest FROM request_information_services AS ris LEFT JOIN user ON ris.client_id = user.id WHERE ris.client_id = '" + user_id + "' AND ris.status = '0' AND  user.status = '1' ";
//             break;
//     }
//     if (start != 'undefined' && end != 'undefined') que += " AND created_date BETWEEN '" + start + "' AND '" + end + "'";
//     return commonFun.runSQLquery(que);
// }

// commonModel.getTotalBroadcastRequest = (start, end, role_id, user_id) => {
//     let que;
//     switch (role_id) {
//         case '1':
//         case '4':
//             que = "SELECT COUNT(ris.id) as Broadcast FROM request_information_services AS ris LEFT JOIN user ON ris.client_id = user.id WHERE user.status = 1 AND ris.status = 1";
//             break;
//         case '2':
//             que = "SELECT COUNT(ir.id) as Broadcast FROM interpreter_request AS ir LEFT JOIN request_information_services AS ris ON ir.job_id = ris.id LEFT JOIN user ON ir.Interpreter_id = user.id WHERE ir.Interpreter_id = '" + user_id + "' AND ir.status = 0 AND ir.pending_status = '0' AND ir.accepted_by_other = '0' AND user.status = '1' AND user.profile_status = '1' ";
//             break;
//         case '3':
//             que = "SELECT COUNT(ris.id) as Broadcast FROM request_information_services AS ris LEFT JOIN user ON ris.client_id = user.id WHERE ris.client_id = '" + user_id + "' AND ris.status = '1' AND  user.status = '1' ";
//             break;
//     }
//     if (start != 'undefined' && end != 'undefined') que += " AND created_date BETWEEN '" + start + "' AND '" + end + "'";
//     return commonFun.runSQLquery(que);
// }

// commonModel.getTotalInProgressRequest = (start, end, role_id, user_id) => {
//     let que;
//     switch (role_id) {
//         case '1':
//         case '4':
//             que = "SELECT COUNT(ris.id) as InProgress FROM request_information_services AS ris LEFT JOIN user ON ris.client_id = user.id WHERE user.status = 1 AND ris.status IN('2','6','7','8','9')";
//             break;
//         case '2':
//             que = "SELECT COUNT(ir.id) as InProgress FROM interpreter_request AS ir LEFT JOIN request_information_services AS ris ON ir.job_id = ris.id LEFT JOIN user ON ir.Interpreter_id = user.id WHERE ir.Interpreter_id = '" + user_id + "' AND ris.status IN('2','6','7','8','9') AND ir.status IN('1','2','6','7','8','9') AND ir.accepted_by_other = '0' AND user.status = '1' AND user.profile_status = '1' ";
//             break;
//         case '3':
//             que = "SELECT COUNT(ris.id) as InProgress FROM request_information_services AS ris LEFT JOIN user ON ris.client_id = user.id WHERE ris.client_id = '" + user_id + "' AND ris.status IN('2','6','7','8','9') AND  user.status = '1' ";
//             break;
//     }


//     if (start != 'undefined' && end != 'undefined') que += " AND ris.created_date BETWEEN '" + start + "' AND '" + end + "'";
//     return commonFun.runSQLquery(que);
// }

// commonModel.getTotalCompleteRequest = (start, end, role_id, user_id) => {
//     let que;
//     switch (role_id) {
//         case '1':
//         case '4':
//             que = "SELECT COUNT(ris.id) as Complete FROM request_information_services AS ris LEFT JOIN user ON ris.client_id = user.id WHERE user.status = 1 AND ris.status = 10";
//             break;
//         case '2':
//             que = "SELECT COUNT(ir.id) as Complete FROM interpreter_request AS ir LEFT JOIN request_information_services AS ris ON ir.job_id = ris.id LEFT JOIN user ON ir.Interpreter_id = user.id WHERE ir.Interpreter_id = '" + user_id + "' AND ir.status = '10' AND ir.accepted_by_other = '0' AND user.status = '1' AND user.profile_status = '1' ";
//             break;
//         case '3':
//             que = "SELECT COUNT(ris.id) as Complete FROM request_information_services AS ris LEFT JOIN user ON ris.client_id = user.id WHERE ris.client_id = '" + user_id + "' AND ris.status = '10' AND  user.status = '1' ";
//             break;
//     }
//     if (start != 'undefined' && end != 'undefined') que += " AND ris.created_date BETWEEN '" + start + "' AND '" + end + "'";
//     return commonFun.runSQLquery(que);
// }

// commonModel.getTotalCancelledRequest = (start, end, role_id, user_id) => {
//     //let que = "SELECT COUNT(ris.id) as Cencelled FROM request_information_services AS ris LEFT JOIN user ON ris.client_id = user.id WHERE user.status = 1 AND ris.status = 5 OR ris.status = 6";
//     let que;
//     switch (role_id) {
//         case '1':
//         case '4':
//             que = "SELECT COUNT(ris.id) as Cancelled FROM request_information_services AS ris LEFT JOIN user ON ris.client_id = user.id WHERE user.status = 1 AND ris.status IN('3', '4', '5')";
//             break;
//         case '2':
//             que = "SELECT COUNT(ir.id) as Cancelled FROM interpreter_request AS ir LEFT JOIN request_information_services AS ris ON ir.job_id = ris.id LEFT JOIN user ON ir.Interpreter_id = user.id WHERE ir.Interpreter_id = '" + user_id + "' AND ris.status IN('3', '4','5') AND user.status = '1' AND user.profile_status = '1' ";
//             break;
//         case '3':
//             que = "SELECT COUNT(ris.id) as Cancelled FROM request_information_services AS ris LEFT JOIN user ON ris.client_id = user.id WHERE ris.client_id = '" + user_id + "' AND ris.status IN('3','4','5') AND  user.status = '1' ";
//             break;
//     }
//     if (start != 'undefined' && end != 'undefined') que += " AND ris.created_date BETWEEN '" + start + "' AND '" + end + "'";
//     return commonFun.runSQLquery(que);
// }

// //***** Get Graph Details end *****//


// //***** Get Pie Chart Details start *****//
// commonModel.getTop5Interpreter = (start, end) => {
//     // let que = "SELECT ir.Interpreter_id,COUNT(ir.job_id) as value, user.first_name, user.last_name, MAX(ir.Interpreter_id) as top5 FROM interpreter_request As ir LEFT JOIN user ON ir.Interpreter_id = user.id WHERE ir.status = 10  AND ir.accepted_by_other = 0 GROUP BY ir.Interpreter_id ORDER BY COUNT(*) DESC LIMIT 5";
//     let que = "SELECT ir.Interpreter_id,COUNT(ir.job_id) as value, user.first_name, user.last_name  FROM request_information_services As ris LEFT JOIN interpreter_request As ir ON ris.id = ir.job_id LEFT JOIN user ON ir.Interpreter_id = user.id WHERE ir.status = 10 AND ir.accepted_by_other = 0 AND user.status = 1";
//     if (start != 'undefined' && end != 'undefined') que += " AND ris.created_date BETWEEN '" + start + "' AND '" + end + "'";
//     que += " GROUP BY ir.Interpreter_id ORDER BY COUNT(*) DESC LIMIT 5"
//     return commonFun.runSQLquery(que);
// }

// commonModel.getTop5Clients = (start, end) => {
//     let que = "SELECT ris.client_id, COUNT(ir.job_id) as value, user.first_name, user.last_name FROM request_information_services As ris LEFT JOIN user ON ris.client_id = user.id LEFT JOIN interpreter_request As ir ON ris.id = ir.job_id  WHERE ir.status = 10 AND ir.accepted_by_other = 0 AND user.status = 1 ";
//     if (start != 'undefined' && end != 'undefined') que += " AND ris.created_date BETWEEN '" + start + "' AND '" + end + "'";
//     que += " GROUP BY ris.client_id ORDER BY COUNT(*) DESC LIMIT 5";
//     return commonFun.runSQLquery(que);
// }

// commonModel.getTop5Services = (start, end, role_id, user_id) => {
//     let que;
//     switch (role_id) {
//         case '1':
//         case '4':
//             que = "SELECT lob.name, COUNT(ir.job_id) as value FROM request_information_services AS ris LEFT JOIN user ON ris.client_id = user.id LEFT JOIN interpreter_request As ir ON ris.id = ir.job_id LEFT JOIN appointment_information_services AS ais ON ris.id = ais.ris_id LEFT JOIN master_lob AS lob ON ais.lob = lob.id  WHERE ir.status = 10 AND ir.accepted_by_other = 0 AND user.status = 1 ";
//             break;
//         case '2':
//             que = "SELECT lob.name, COUNT(ir.job_id) as value FROM request_information_services AS ris LEFT JOIN interpreter_request As ir ON ris.id = ir.job_id LEFT JOIN user ON ir.Interpreter_id = user.id LEFT JOIN appointment_information_services AS ais ON ris.id = ais.ris_id LEFT JOIN master_lob AS lob ON ais.lob = lob.id  WHERE ir.status = 10  AND ir.accepted_by_other = 0 AND user.status = 1 AND user.profile_status = 1 AND ir.Interpreter_id = '" + user_id + "'";
//             break;
//         case '3':
//             que = "SELECT lob.name, COUNT(ir.job_id) as value FROM request_information_services AS ris LEFT JOIN user ON ris.client_id = user.id LEFT JOIN interpreter_request As ir ON ris.id = ir.job_id LEFT JOIN appointment_information_services AS ais ON ris.id = ais.ris_id LEFT JOIN master_lob AS lob ON ais.lob = lob.id  WHERE ir.status = 10  AND ir.accepted_by_other = 0 AND user.status = 1 AND ris.client_id = '" + user_id + "'";
//             break;
//     }
//     if (start != 'undefined' && end != 'undefined') que += " AND ris.created_date BETWEEN '" + start + "' AND '" + end + "'";
//     que += " GROUP BY ais.lob ORDER BY COUNT(*) DESC LIMIT 5";
//     return commonFun.runSQLquery(que);
// }

// commonModel.getTop5InterpretersCencelReq = (start, end, role_id, user_id) => {
//     // let que = "SELECT COUNT(id) as cencelled FROM request_information_services WHERE status = 5 OR status = 6";
//      let que;
//     switch (role_id) {    
//         case '1':
//         case '4':
//             que = " SELECT user.id, user.first_name, user.last_name, COUNT(ir.job_id) as value FROM request_information_services As ris LEFT JOIN interpreter_request As ir ON ris.id = ir.job_id LEFT JOIN user ON ir.Interpreter_id = user.id  WHERE ris.status = 4 AND ir.status = 4  AND ir.accepted_by_other = 0 AND user.status = 1 AND user.profile_status = 1 ";
//             break;
//         case '2':
//             que = " SELECT user.id, user.first_name, user.last_name, COUNT(ir.job_id) as value FROM request_information_services As ris LEFT JOIN interpreter_request As ir ON ris.id = ir.job_id LEFT JOIN user ON ris.client_id = user.id  WHERE ris.status = 4 AND ir.status = 4  AND ir.accepted_by_other = 0 AND user.status = 1  AND ir.Interpreter_id = '" + user_id + "'";
//             break;
//         case '3':
//             que = " SELECT user.id, user.first_name, user.last_name, COUNT(ir.job_id) as value FROM request_information_services As ris LEFT JOIN interpreter_request As ir ON ris.id = ir.job_id LEFT JOIN user ON ir.Interpreter_id = user.id  WHERE ris.status = 4 AND ir.status = 4  AND ir.accepted_by_other = 0 AND user.status = 1 AND user.profile_status = 1 AND ris.client_id = '" + user_id + "'";
//             break;
//     }
//     if (start != 'undefined' && end != 'undefined') que += " AND ris.created_date BETWEEN '" + start + "' AND '" + end + "'";
//     que += "GROUP BY user.id ORDER BY COUNT(*) DESC LIMIT 5";
//     return commonFun.runSQLquery(que);
// }

// commonModel.getTop5Locations = (start, end, role_id, user_id) => {
//     let que;
//     switch (role_id) {
//         case '1':
//         case '4':
//             que = " SELECT ais.latitude, ais.longitude, ais.address AS name, COUNT(ir.job_id) as value FROM request_information_services As ris LEFT JOIN user ON ris.client_id = user.id LEFT JOIN interpreter_request As ir ON ris.id = ir.job_id LEFT JOIN appointment_information_services AS ais ON ris.id = ais.ris_id  WHERE ir.status = 10  AND ir.accepted_by_other = 0 AND user.status = 1 ";
//             break;
//         case '2':
//             que = " SELECT ais.latitude, ais.longitude, ais.address AS name, COUNT(ir.job_id) as value FROM request_information_services As ris LEFT JOIN interpreter_request As ir ON ris.id = ir.job_id LEFT JOIN user ON ir.Interpreter_id = user.id LEFT JOIN appointment_information_services AS ais ON ris.id = ais.ris_id  WHERE ir.status = 10  AND ir.accepted_by_other = 0 AND user.status = 1 AND user.profile_status = 1 AND ir.Interpreter_id = '" + user_id + "'";
//             break;
//         case '3':
//             que = " SELECT ais.latitude, ais.longitude, ais.address AS name, COUNT(ir.job_id) as value FROM request_information_services As ris LEFT JOIN user ON ris.client_id = user.id LEFT JOIN interpreter_request As ir ON ris.id = ir.job_id LEFT JOIN appointment_information_services AS ais ON ris.id = ais.ris_id  WHERE ir.status = 10  AND ir.accepted_by_other = 0 AND user.status = 1 AND ris.client_id = '" + user_id + "'";
//             break;
//     }
//     if (start != 'undefined' && end != 'undefined') que += " AND ris.created_date BETWEEN '" + start + "' AND '" + end + "'";
//     que += "GROUP BY ais.address ORDER BY COUNT(*) DESC LIMIT 5";
//     return commonFun.runSQLquery(que);
// }

// commonModel.getTop5Languages = (start, end, role_id, user_id) => {
//     let que;
//     switch (role_id) {
//         case '1':
//         case '4':
//             que = " SELECT l.name, COUNT(ir.job_id) as value FROM request_information_services As ris LEFT JOIN user ON ris.client_id = user.id LEFT JOIN interpreter_request As ir ON ris.id = ir.job_id LEFT JOIN appointment_information_services AS ais ON ris.id = ais.ris_id LEFT JOIN languages AS l ON ais.language = l.id  WHERE ir.status = 10  AND ir.accepted_by_other = 0 AND user.status = 1 ";
//             break;
//         case '2':
//             que = " SELECT l.name, COUNT(ir.job_id) as value FROM request_information_services As ris LEFT JOIN interpreter_request As ir ON ris.id = ir.job_id LEFT JOIN user ON ir.Interpreter_id = user.id LEFT JOIN appointment_information_services AS ais ON ris.id = ais.ris_id LEFT JOIN languages AS l ON ais.language = l.id  WHERE ir.status = 10  AND ir.accepted_by_other = 0 AND user.status = 1 AND user.profile_status = 1 AND ir.Interpreter_id = '" + user_id + "'";
//             break;
//         case '3':
//             que = " SELECT l.name, COUNT(ir.job_id) as value FROM request_information_services As ris LEFT JOIN user ON ris.client_id = user.id LEFT JOIN interpreter_request As ir ON ris.id = ir.job_id LEFT JOIN appointment_information_services AS ais ON ris.id = ais.ris_id LEFT JOIN languages AS l ON ais.language = l.id  WHERE ir.status = 10  AND ir.accepted_by_other = 0 AND user.status = 1 AND ris.client_id = '" + user_id + "'";
//             break;
//     }
//     if (start != 'undefined' && end != 'undefined') que += " AND ris.created_date BETWEEN '" + start + "' AND '" + end + "'";
//     que += "GROUP BY ais.language ORDER BY COUNT(*) DESC LIMIT 5";
//     return commonFun.runSQLquery(que);
// }
// //***** Get Pie Chart Details End *****//

// //***** Check Language Code Already Exist Start *****//
// commonModel.checkLanCodeAlreadyExist = (code) => {
//     let que = "SELECT * FROM languages WHERE code = '" + code + "'";
//     return commonFun.runSQLquery(que);
// }
// //***** Check Language Code Already Exist End *****//

// //***** Get Filter Template Start *****//
// commonModel.getEmailTemplateList = (title) => {
//     let que = "SELECT * FROM email_template ";
//     if(title != 'undefined' && title != '') que += " WHERE subject  LIKE '"+title+"%'";
//     // if(title != 'undefined' && title != '') que += " WHERE title LIKE '"+title+"%' OR subject LIKE '"+title+"%'";
//     que += "ORDER BY ID DESC"; 
//       return commonFun.runSQLquery(que);

// }
// //***** Get Filter Template  End *****//


module.exports = commonModel;