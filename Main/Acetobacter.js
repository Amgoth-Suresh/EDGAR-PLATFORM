Highcharts.chart('container', {
    chart: {
        spacingBottom: 30,
        marginRight: 120,
        type: 'treegraph',
        width: 1300,
        height: 1200       
    },
    title: {
        text: 'Phylogenetic Tree Visualization'
    },
    
    series: [{
        dataLabels: {
            enabled: true,
            linkFormat: '<span style="color: RED; font-size: 5px;">{point.customLabel}</span>', // Style only customLabel
            align: 'left',
            style: {
                textAlign: 'left',
                fontSize: '9px',
                fontWeight: 'normal',
                color: 'black',
                width: '200px',
                overflow: 'none',
                whiteSpace: 'nowrap',
            },
            crop: false,
            allowOverlap: false,
            padding: 2,
            rotation: 0
        },
        data: [
            
            
                { id: 'Internal_node0', parent: 'root', name: '1', customLabel: '0', level: 1 },
                { id: 'ALL_Acetobacter_pasteurianus_IFO_3283_01_NC_013209', parent: 'Internal_node0', name: 'ALL_Acetobacter_pasteurianus_IFO_3283_01_NC_013209', customLabel: '0.000000005', level: 2 },
                { id: 'Internal_node1', parent: 'Internal_node0', name: '1', customLabel: '0.000003148', level: 2 },
                { id: 'ALL_Acetobacter_pasteurianus_IFO_3283_03_NC_017100', parent: 'Internal_node1', name: 'ALL_Acetobacter_pasteurianus_IFO_3283_03_NC_017100', customLabel: '0', level: 3 },
                { id: 'ALL_Acetobacter_pasteurianus_IFO_3283_26_NC_017146', parent: 'Internal_node1', name: 'ALL_Acetobacter_pasteurianus_IFO_3283_26_NC_017146', customLabel: '0', level: 3 },
                { id: 'Internal_node2', parent: 'Internal_node0', name: '0', customLabel: '0.000000006', level: 2 },
                { id: 'Internal_node3', parent: 'Internal_node2', name: '1', customLabel: '0.000000005', level: 3 },
                { id: 'ALL_Acetobacter_pasteurianus_IFO_3283_07_NC_017121', parent: 'Internal_node3', name: 'ALL_Acetobacter_pasteurianus_IFO_3283_07_NC_017121', customLabel: '0', level: 4 },
                { id: 'ALL_Acetobacter_pasteurianus_IFO_3283_12_NC_017108', parent: 'Internal_node3', name: 'ALL_Acetobacter_pasteurianus_IFO_3283_12_NC_017108', customLabel: '0', level: 4 },
                { id: 'ALL_Acetobacter_pasteurianus_IFO_3283_22_NC_017125', parent: 'Internal_node3', name: 'ALL_Acetobacter_pasteurianus_IFO_3283_22_NC_017125', customLabel: '0', level: 4 },
                { id: 'ALL_Acetobacter_pasteurianus_IFO_3283_32_NC_017111', parent: 'Internal_node3', name: 'ALL_Acetobacter_pasteurianus_IFO_3283_32_NC_017111', customLabel: '0', level: 4 },
                { id: 'Internal_node4', parent: 'Internal_node2', name: '0.608', customLabel: '0.000000005', level: 3 },
                { id: 'ALL_Acetobacter_pasteurianus_IFO_3283_01_42C_NC_017150', parent: 'Internal_node4', name: 'ALL_Acetobacter_pasteurianus_IFO_3283_01_42C_NC_017150', customLabel: '0.000003148', level: 4 },
                { id: 'Internal_node5', parent: 'Internal_node4', name: '1', customLabel: '0.000237369', level: 4 },
                { id: 'ALL_Acetobacter_pasteurianus_subsp_pasteurianus_strain_SRCM101468_NZ_CP021922', parent: 'Internal_node5', name: 'ALL_Acetobacter_pasteurianus_subsp_pasteurianus_strain_SRCM101468_NZ_CP021922', customLabel: '0.000540817', level: 5 },
                { id: 'Internal_node6', parent: 'Internal_node5', name: '1', customLabel: '0.001736321', level: 5 },
                { id: 'Internal_node7', parent: 'Internal_node6', name: '1', customLabel: '0.000994003', level: 6 },
                { id: 'ALL_Acetobacter_pasteurianus_strain_CICC_22518_NZ_CP039846', parent: 'Internal_node7', name: 'ALL_Acetobacter_pasteurianus_strain_CICC_22518_NZ_CP039846', customLabel: '0.004839954', level: 7 },
                { id: 'Internal_node8', parent: 'Internal_node7', name: '1', customLabel: '0.004860261', level: 7 },
                { id: 'Internal_node9', parent: 'Internal_node8', name: '1', customLabel: '0.006972466', level: 8 },
                { id: 'ALL_Acetobacter_sp_B6_NZ_CP042808', parent: 'Internal_node9', name: 'ALL_Acetobacter_sp_B6_NZ_CP042808', customLabel: '0.002423639', level: 9 },
                { id: 'Internal_node10', parent: 'Internal_node9', name: '1', customLabel: '0.002236053', level: 9 },
                { id: 'ALL_Acetobacter_pasteurianus_subsp_pasteurianus_strain_SRCM101342_NZ_CP021509', parent: 'Internal_node10', name: 'ALL_Acetobacter_pasteurianus_subsp_pasteurianus_strain_SRCM101342_NZ_CP021509', customLabel: '0.000391404', level: 10 },
                { id: 'Acetobacter_pasteurianus_strain_Ab3_NZ_CP012111', parent: 'Internal_node10', name: 'Acetobacter_pasteurianus_strain_Ab3_NZ_CP012111', customLabel: '0.000546705', level: 10 },
                { id: 'Internal_node11', parent: 'Internal_node8', name: '1', customLabel: '0.004429779', level: 8 },
                { id: 'Internal_node12', parent: 'Internal_node11', name: '1', customLabel: '0.009073129', level: 9 },
                { id: 'ALL_Acetobacter_ascendens_strain_SRCM101447_NZ_CP021524', parent: 'Internal_node12', name: 'ALL_Acetobacter_ascendens_strain_SRCM101447_NZ_CP021524', customLabel: '0.002665784', level: 10 },
                { id: 'Internal_node13', parent: 'Internal_node12', name: '1', customLabel: '0.00220352', level: 10 },
                { id: 'ALL_Acetobacter_ascendens_strain_LMG_1590_NZ_CP015164', parent: 'Internal_node13', name: 'ALL_Acetobacter_ascendens_strain_LMG_1590_NZ_CP015164', customLabel: '0.001050273', level: 11 },
                { id: 'ALL_Acetobacter_ascendens_strain_LMG_1591_NZ_CP015168', parent: 'Internal_node13', name: 'ALL_Acetobacter_ascendens_strain_LMG_1591_NZ_CP015168', customLabel: '0.001038085', level: 11 },
                { id: 'Internal_node14', parent: 'Internal_node11', name: '1', customLabel: '0.004680854', level: 9 },
                { id: 'Internal_node15', parent: 'Internal_node14', name: '1', customLabel: '0.099578405', level: 10 },
                { id: 'Internal_node16', parent: 'Internal_node15', name: '1', customLabel: '0.048836524', level: 11 },
                { id: 'Acetobacter_aceti_strain_TMW2_1153_NZ_CP014692', parent: 'Internal_node16', name: 'Acetobacter_aceti_strain_TMW2_1153_NZ_CP014692', customLabel: '0.359315694', level: 12 },
                { id: 'Internal_node17', parent: 'Internal_node16', name: '1', customLabel: '0.045120118', level: 12 },
                { id: 'ALL_Acetobacter_persici_strain_TMW2_1084_NZ_CP014687', parent: 'Internal_node17', name: 'ALL_Acetobacter_persici_strain_TMW2_1084_NZ_CP014687', customLabel: '0.10918384', level: 13 },
                { id: 'Internal_node18', parent: 'Internal_node17', name: '1', customLabel: '0.036618744', level: 13 },
                { id: 'ALL_Acetobacter_orientalis_strain_FAN1_NZ_AP018515', parent: 'Internal_node18', name: 'ALL_Acetobacter_orientalis_strain_FAN1_NZ_AP018515', customLabel: '0.125388743', level: 14 },
                { id: 'Internal_node19', parent: 'Internal_node18', name: '1', customLabel: '0.073264602', level: 14 },
                { id: 'ALL_Acetobacter_senegalensis_strain_108B_chromosome_I_NZ_LN606600', parent: 'Internal_node19', name: 'ALL_Acetobacter_senegalensis_strain_108B_chromosome_I_NZ_LN606600', customLabel: '0.003299478', level: 15 },
                { id: 'ALL_Acetobacter_tropicalis_strain_BDGP1_NZ_CP022699', parent: 'Internal_node19', name: 'ALL_Acetobacter_tropicalis_strain_BDGP1_NZ_CP022699', customLabel: '0.003098629', level: 15 },
                { id: 'Internal_node20', parent: 'Internal_node15', name: '1', customLabel: '0.034752801', level: 11 },
                { id: 'ALL_Acetobacter_sp_KACC_21233_NZ_CP043506', parent: 'Internal_node20', name: 'ALL_Acetobacter_sp_KACC_21233_NZ_CP043506', customLabel: '0.168861147', level: 12 },
                { id: 'ALL_Acetobacter_ghanensis_strain_LMG_23848T_chromosome_I_NZ_LN609302', parent: 'Internal_node20', name: 'ALL_Acetobacter_ghanensis_strain_LMG_23848T_chromosome_I_NZ_LN609302', customLabel: '0.118344125', level: 12 },
                { id: 'Internal_node21', parent: 'Internal_node14', name: '1', customLabel: '0.01183637', level: 10 },
                { id: 'Internal_node22', parent: 'Internal_node21', name: '1', customLabel: '0.001856309', level: 11 },
                { id: 'ALL_Acetobacter_pomorum_strain_SH_NZ_CP023189', parent: 'Internal_node22', name: 'ALL_Acetobacter_pomorum_strain_SH_NZ_CP023189', customLabel: '0.000037683', level: 12 },
                { id: 'Acetobacter_oryzifermentans_strain_dm_NZ_CP022374', parent: 'Internal_node22', name: 'Acetobacter_oryzifermentans_strain_dm_NZ_CP022374', customLabel: '0.000938908', level: 12 },
                { id: 'Internal_node23', parent: 'Internal_node21', name: '0.997', customLabel: '0.000508826', level: 11 },
                { id: 'ALL_Acetobacter_oryzifermentans_strain_SLV_7_NZ_CP011120', parent: 'Internal_node23', name: 'ALL_Acetobacter_oryzifermentans_strain_SLV_7_NZ_CP011120', customLabel: '0.001928201', level: 12 },
                { id: 'Internal_node24', parent: 'Internal_node23', name: '1', customLabel: '0.001686373', level: 12 },
                { id: 'ALL_Acetobacter_pomorum_strain_BDGP5_NZ_CP023657', parent: 'Internal_node24', name: 'ALL_Acetobacter_pomorum_strain_BDGP5_NZ_CP023657', customLabel: '0.000040958', level: 13 },
                { id: 'ALL_Acetobacter_sp_JWB_NZ_CP030871', parent: 'Internal_node24', name: 'ALL_Acetobacter_sp_JWB_NZ_CP030871', customLabel: '0.000015747', level: 13 },
                { id: 'Internal_node25', parent: 'Internal_node6', name: '1', customLabel: '0.000833483', level: 6 },
                { id: 'ALL_Acetobacter_pasteurianus_386B_NZ_HF677570', parent: 'Internal_node25', name: 'ALL_Acetobacter_pasteurianus_386B_NZ_HF677570', customLabel: '0.000862691', level: 7 },
                { id: 'ALL_Acetobacter_pasteurianus_NBRC_101655_AP014881', parent: 'Internal_node25', name: 'ALL_Acetobacter_pasteurianus_NBRC_101655_AP014881', customLabel: '0.000703775', level: 7 }
              
              
              
              
        ],
        marker: {
            symbol: 'circle',
            radius: 7,
            fillcolor: '#ffffff',
            linewidth: 2
        },
        levels:[
            {
                level:2,
                colorByPoint:true,

            },
            {
                level:3,
                colorByPoint:false,
                colorVariation:{
                    key:'brightness',
                    to:0.5
                }
            } 
            
            
            
            
        ],
        point: {
            events: {
                click: function () {
                    if (!this.children || this.children.length === 0) {
                        if (!this.id.startsWith('Internal') && this.id !== 'root') {
                            const newLabel = prompt('Edit node label:', this.id);
                            if (newLabel !== null) {
                                this.update({ name: newLabel });
                            }
                        }
                    }
                }
            }
        }
    }]
});

