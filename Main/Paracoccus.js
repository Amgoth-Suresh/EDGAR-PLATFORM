Highcharts.chart('container', {
    chart: {
        spacingBottom: 30,
        marginRight: 120,
        type: 'treegraph',
        height: 1200
    },
    title: {
        text: 'Phylogenetic Tree Visualization'
    },
    series: [{
        colorByPoint: false,
        dataLabels: {
            enabled: true,
            verticalAlign: 'middle',
            linkFormat: '<span style="color: green; font-size: 8px;">{point.customLabel}</span>', // Style only customLabel
            align: 'left',
            style: {
                textAlign: 'left',
                fontSize: '9px',
                width: '200px',
                overflow: 'none',
                whiteSpace: 'nowrap',
                x: -10
            },
            crop: false,
            allowOverlap: false,
            padding: 2,
            rotation: 0
        },
        data: [
            
            
                { id: 'Internal_node0', parent: 'root', name: '1', customLabel: '0', level: 1 },
                { id: 'Internal_node1', parent: 'Internal_node0', name: '1', customLabel: '0.02408', level: 2 },
                { id: 'Internal_node2', parent: 'Internal_node1', name: '1', customLabel: '0.0102', level: 3 },
                { id: 'Internal_node3', parent: 'Internal_node2', name: '1', customLabel: '0.06436', level: 4 },
                { id: 'ALL_Paracoccus_contaminans_strain_RKI_16_01929T_LMG_29738T_CCM_8701T_CIP_111112T_NZ_CP020612', parent: 'Internal_node3', name: 'ALL_Paracoccus_contaminans_strain_RKI_16_01929T_LMG_29738T_CCM_8701T_CIP_111112T_NZ_CP020612', customLabel: '0.10417', level: 5 },
                { id: 'ALL_Paracoccus_sanguinis_strain_OM2164_NZ_CP051542', parent: 'Internal_node3', name: 'ALL_Paracoccus_sanguinis_strain_OM2164_NZ_CP051542', customLabel: '0.09411', level: 5 },
                { id: 'Paracoccus_sp_SC2_6_NZ_CP030918', parent: 'Internal_node2', name: 'Paracoccus_sp_SC2_6_NZ_CP030918', customLabel: '0.1887', level: 4 },
                { id: 'Internal_node4', parent: 'Internal_node1', name: '1', customLabel: '0.0042', level: 3 },
                { id: 'ALL_Paracoccus_jeotgali_strain_CBA4604_NZ_CP025583', parent: 'Internal_node4', name: 'ALL_Paracoccus_jeotgali_strain_CBA4604_NZ_CP025583', customLabel: '0.19357', level: 4 },
                { id: 'Internal_node5', parent: 'Internal_node4', name: '1', customLabel: '0.02165', level: 4 },
                { id: 'Internal_node6', parent: 'Internal_node5', name: '1', customLabel: '0.02438', level: 5 },
                { id: 'Internal_node7', parent: 'Internal_node6', name: '1', customLabel: '0.05488', level: 6 },
                { id: 'ALL_Paracoccus_sp_2251_NZ_CP038439', parent: 'Internal_node7', name: 'ALL_Paracoccus_sp_2251_NZ_CP038439', customLabel: '0.07083', level: 7 },
                { id: 'ALL_Paracoccus_sp_Arc7_R13_NZ_CP034810', parent: 'Internal_node7', name: 'ALL_Paracoccus_sp_Arc7_R13_NZ_CP034810', customLabel: '0.06713', level: 7 },
                { id: 'ALL_Paracoccus_sp_AK26_CP041041', parent: 'Internal_node6', name: 'ALL_Paracoccus_sp_AK26_CP041041', customLabel: '0.10508', level: 6 },
                { id: 'Internal_node8', parent: 'Internal_node5', name: '1', customLabel: '0.04758', level: 5 },
                { id: 'ALL_Paracoccus_sp_BM15_NZ_CP025408', parent: 'Internal_node8', name: 'ALL_Paracoccus_sp_BM15_NZ_CP025408', customLabel: '0.09961', level: 6 },
                { id: 'ALL_Paracoccus_zhejiangensis_strain_J6_NZ_CP025430', parent: 'Internal_node8', name: 'ALL_Paracoccus_zhejiangensis_strain_J6_NZ_CP025430', customLabel: '0.08182', level: 6 },
                { id: 'Internal_node9', parent: 'Internal_node0', name: '1', customLabel: '0.03355', level: 2 },
                { id: 'Internal_node10', parent: 'Internal_node9', name: '1', customLabel: '0.01468', level: 3 },
                { id: 'ALL_Paracoccus_aminovorans_chromosome_I_NZ_LN832559', parent: 'Internal_node10', name: 'ALL_Paracoccus_aminovorans_chromosome_I_NZ_LN832559', customLabel: '0.06546', level: 4 },
                { id: 'Internal_node11', parent: 'Internal_node10', name: '1', customLabel: '0.0171', level: 4 },
                { id: 'Internal_node12', parent: 'Internal_node11', name: '1', customLabel: '0.01869', level: 5 },
                { id: 'Internal_node13', parent: 'Internal_node12', name: '1', customLabel: '0.03181', level: 6 },
                { id: 'ALL_Paracoccus_denitrificans_PD1222_chromosome_1_NC_008686', parent: 'Internal_node13', name: 'ALL_Paracoccus_denitrificans_PD1222_chromosome_1_NC_008686', customLabel: '0.00006', level: 7 },
                { id: 'ALL_Paracoccus_denitrificans_strain_ATCC_19367_chromosome_1_NZ_CP035090', parent: 'Internal_node13', name: 'ALL_Paracoccus_denitrificans_strain_ATCC_19367_chromosome_1_NZ_CP035090', customLabel: '-0.00003', level: 7 },
                { id: 'ALL_Paracoccus_pantotrophus_strain_DSM_2944_chromosome_1_NZ_CP044426', parent: 'Internal_node12', name: 'ALL_Paracoccus_pantotrophus_strain_DSM_2944_chromosome_1_NZ_CP044426', customLabel: '0.03153', level: 6 },
                { id: 'ALL_Paracoccus_kondratievae_strain_BJQ0001_chromosome_1_NZ_CP045072', parent: 'Internal_node11', name: 'ALL_Paracoccus_kondratievae_strain_BJQ0001_chromosome_1_NZ_CP045072', customLabel: '0.06515', level: 5 },
                { id: 'Internal_node14', parent: 'Internal_node9', name: '1', customLabel: '0.08516', level: 3 },
                { id: 'Paracoccus_mutanolyticus_strain_RSP_02_NZ_CP030239', parent: 'Internal_node14', name: 'Paracoccus_mutanolyticus_strain_RSP_02_NZ_CP030239', customLabel: '0.00978', level: 4 },
                { id: 'Internal_node15', parent: 'Internal_node14', name: '1', customLabel: '0.00067', level: 4 },
                { id: 'ALL_Paracoccus_yeei_strain_FDAARGOS_252_NZ_CP020442', parent: 'Internal_node15', name: 'ALL_Paracoccus_yeei_strain_FDAARGOS_252_NZ_CP020442', customLabel: '0.00389', level: 5 },
                { id: 'Internal_node16', parent: 'Internal_node15', name: '1', customLabel: '0.00047', level: 5 },
                { id: 'Internal_node17', parent: 'Internal_node16', name: '1', customLabel: '0.00029', level: 6 },
                { id: 'ALL_Paracoccus_yeei_strain_CCUG_32053_NZ_CP031078', parent: 'Internal_node17', name: 'ALL_Paracoccus_yeei_strain_CCUG_32053_NZ_CP031078', customLabel: '0.00352', level: 7 },
                { id: 'ALL_Paracoccus_yeei_strain_FDAARGOS_643_NZ_CP044081', parent: 'Internal_node17', name: 'ALL_Paracoccus_yeei_strain_FDAARGOS_643_NZ_CP044081', customLabel: '0.00296', level: 7 },
                { id: 'ALL_Paracoccus_yeei_strain_TT13_NZ_CP024422', parent: 'Internal_node16', name: 'ALL_Paracoccus_yeei_strain_TT13_NZ_CP024422', customLabel: '0.00315', level: 6 },
                { id: 'ALL_Paracoccus_aminophilus_JCM_7686_NC_022041', parent: 'Internal_node0', name: 'ALL_Paracoccus_aminophilus_JCM_7686_NC_022041', customLabel: '0.14657', level: 2 }
              
              
              
              
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
                colorVariation:{
                    key:'brightness',
                    to:0.5
                }

            },
            
            
            
            
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

