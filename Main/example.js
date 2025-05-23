function getLinkColor(value) {
    const num = parseFloat(value);
    if (num < 0.001) return '#2ECC71';     // green
    if (num < 0.01) return '#F1C40F';      // yellow
    if (num < 0.1) return '#E67E22';       // orange
    return '#E74C3C';                      // red
}

Highcharts.chart('container', {
    chart: {
        spacingBottom: 30,
        marginRight: 400,
        width: null,
        height: 1200,
    },
    title: {
        text: 'Phylogenetic language tree'
    },
    tooltip: {
      pointFormatter: function () {
          return `<b>${this.name}</b>`;
      }
    },
    series: [
        {
            type: 'treegraph',
            clip: false,
            data: 
            [
                
                    {
                      "id": "root",
                      "name": "Root",
                      "level": 0
                    },
                    {
                      "id": "Internal_node0",
                      "parent": "root",
                      "name": "1",
                      "customLabel": "0",
                      "level": 1,
                      "link": {
                        "color": getLinkColor('0')
                      }
                    },
                    {
                      "id": "Internal_node1",
                      "parent": "Internal_node0",
                      "name": "1",
                      "customLabel": "0.006870305",
                      "level": 2,
                      "link": {
                        "color": getLinkColor('0.006870305')
                      }
                    },
                    {
                      "id": "Acidovorax_cattleyae_strain_CAT98_1_NZ_CP028290",
                      "parent": "Internal_node1",
                      "name": "Acidovorax_cattleyae_strain_CAT98_1_NZ_CP028290",
                      "customLabel": "0.024746465",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.024746465')
                      }
                    },
                    {
                      "id": "Internal_node2",
                      "parent": "Internal_node1",
                      "name": "1",
                      "customLabel": "0.007011413",
                      "level": 3,
                      "link": {
                        "color": getLinkColor('0.007011413')
                      }
                    },
                    {
                      "id": "Internal_node3",
                      "parent": "Internal_node2",
                      "name": "1",
                      "customLabel": "0.012121622",
                      "level": 4,
                      "link": {
                        "color": getLinkColor('0.012121622')
                      }
                    },
                    {
                      "id": "ALL_Acidovorax_citrulli_strain_M6_NZ_CP029373",
                      "parent": "Internal_node3",
                      "name": "ALL_Acidovorax_citrulli_strain_M6_NZ_CP029373",
                      "customLabel": "0.00102963",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.00102963')
                      }
                    },
                    {
                      "id": "Internal_node4",
                      "parent": "Internal_node3",
                      "name": "1",
                      "customLabel": "0.002903944",
                      "level": 5,
                      "link": {
                        "color": getLinkColor('0.002903944')
                      }
                    },
                    {
                      "id": "Acidovorax_citrulli_AAC00_1_NC_008752",
                      "parent": "Internal_node4",
                      "name": "Acidovorax_citrulli_AAC00_1_NC_008752",
                      "customLabel": "0.000069387",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.000069387')
                      }
                    },
                    {
                      "id": "Acidovorax_citrulli_strain_KACC17005_NZ_CP023687",
                      "parent": "Internal_node4",
                      "name": "Acidovorax_citrulli_strain_KACC17005_NZ_CP023687",
                      "customLabel": "0.000013827",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.000013827')
                      }
                    },
                    {
                      "id": "Internal_node5",
                      "parent": "Internal_node2",
                      "name": "1",
                      "customLabel": "0.120763369",
                      "level": 4,
                      "link": {
                        "color": getLinkColor('0.120763369')
                      }
                    },
                    {
                      "id": "Internal_node6",
                      "parent": "Internal_node5",
                      "name": "1",
                      "customLabel": "0.052815682",
                      "level": 5,
                      "link": {
                        "color": getLinkColor('0.052815682')
                      }
                    },
                    {
                      "id": "Internal_node7",
                      "parent": "Internal_node6",
                      "name": "1",
                      "customLabel": "0.048729119",
                      "level": 6,
                      "link": {
                        "color": getLinkColor('0.048729119')
                      }
                    },
                    {
                      "id": "ALL_Acidovorax_sp_T1_NZ_CP021648",
                      "parent": "Internal_node7",
                      "name": "ALL_Acidovorax_sp_T1_NZ_CP021648",
                      "customLabel": "0.021045573",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.021045573')
                      }
                    },
                    {
                      "id": "Internal_node8",
                      "parent": "Internal_node7",
                      "name": "1",
                      "customLabel": "0.02012046",
                      "level": 7,
                      "link": {
                        "color": getLinkColor('0.02012046')
                      }
                    },
                    {
                      "id": "Acidovorax_carolinensis_strain_NA3_chromosome_1_NZ_CP021361",
                      "parent": "Internal_node8",
                      "name": "Acidovorax_carolinensis_strain_NA3_chromosome_1_NZ_CP021361",
                      "customLabel": "0.004072656",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.004072656')
                      }
                    },
                    {
                      "id": "Internal_node9",
                      "parent": "Internal_node8",
                      "name": "0.907",
                      "customLabel": "0.001961533",
                      "level": 8,
                      "link": {
                        "color": getLinkColor('0.001961533')
                      }
                    },
                    {
                      "id": "ALL_Acidovorax_carolinensis_strain_NA2_NZ_CP021359",
                      "parent": "Internal_node9",
                      "name": "ALL_Acidovorax_carolinensis_strain_NA2_NZ_CP021359",
                      "customLabel": "0.004991888",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.004991888')
                      }
                    },
                    {
                      "id": "Internal_node10",
                      "parent": "Internal_node9",
                      "name": "1",
                      "customLabel": "0.005700945",
                      "level": 9,
                      "link": {
                        "color": getLinkColor('0.005700945')
                      }
                    },
                    {
                      "id": "ALL_Acidovorax_carolinensis_strain_P3_NZ_CP021362",
                      "parent": "Internal_node10",
                      "name": "ALL_Acidovorax_carolinensis_strain_P3_NZ_CP021362",
                      "customLabel": "0.000670194",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.000670194')
                      }
                    },
                    {
                      "id": "ALL_Acidovorax_carolinensis_strain_P4_NZ_CP021366",
                      "parent": "Internal_node10",
                      "name": "ALL_Acidovorax_carolinensis_strain_P4_NZ_CP021366",
                      "customLabel": "0.000015421",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.000015421')
                      }
                    },
                    {
                      "id": "Internal_node11",
                      "parent": "Internal_node6",
                      "name": "1",
                      "customLabel": "0.021194256",
                      "level": 6,
                      "link": {
                        "color": getLinkColor('0.021194256')
                      }
                    },
                    {
                      "id": "Acidovorax_sp_1608163_NZ_CP033069",
                      "parent": "Internal_node11",
                      "name": "Acidovorax_sp_1608163_NZ_CP033069",
                      "customLabel": "0.078532905",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.078532905')
                      }
                    },
                    {
                      "id": "Internal_node12",
                      "parent": "Internal_node11",
                      "name": "1",
                      "customLabel": "0.020587737",
                      "level": 7,
                      "link": {
                        "color": getLinkColor('0.020587737')
                      }
                    },
                    {
                      "id": "Acidovorax_sp_KKS102_NC_018708",
                      "parent": "Internal_node12",
                      "name": "Acidovorax_sp_KKS102_NC_018708",
                      "customLabel": "0.049562474",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.049562474')
                      }
                    },
                    {
                      "id": "Acidovorax_sp_RAC01_NZ_CP016447",
                      "parent": "Internal_node12",
                      "name": "Acidovorax_sp_RAC01_NZ_CP016447",
                      "customLabel": "0.061171306",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.061171306')
                      }
                    },
                    {
                      "id": "Internal_node13",
                      "parent": "Internal_node5",
                      "name": "1",
                      "customLabel": "0.031544756",
                      "level": 5,
                      "link": {
                        "color": getLinkColor('0.031544756')
                      }
                    },
                    {
                      "id": "Acidovorax_sp_HDW3_NZ_CP049885",
                      "parent": "Internal_node13",
                      "name": "Acidovorax_sp_HDW3_NZ_CP049885",
                      "customLabel": "0.162700842",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.162700842')
                      }
                    },
                    {
                      "id": "Internal_node14",
                      "parent": "Internal_node13",
                      "name": "1",
                      "customLabel": "0.087546223",
                      "level": 6,
                      "link": {
                        "color": getLinkColor('0.087546223')
                      }
                    },
                    {
                      "id": "ALL_Acidovorax_sp_JS42_NC_008782",
                      "parent": "Internal_node14",
                      "name": "ALL_Acidovorax_sp_JS42_NC_008782",
                      "customLabel": "0.00694837",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.00694837')
                      }
                    },
                    {
                      "id": "Acidovorax_ebreus_TPSY_NC_011992",
                      "parent": "Internal_node14",
                      "name": "Acidovorax_ebreus_TPSY_NC_011992",
                      "customLabel": "0.005078213",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.005078213')
                      }
                    },
                    {
                      "id": "Internal_node15",
                      "parent": "Internal_node0",
                      "name": "1",
                      "customLabel": "0.006280865",
                      "level": 2,
                      "link": {
                        "color": getLinkColor('0.006280865')
                      }
                    },
                    {
                      "id": "Internal_node16",
                      "parent": "Internal_node15",
                      "name": "1",
                      "customLabel": "0.007431115",
                      "level": 3,
                      "link": {
                        "color": getLinkColor('0.007431115')
                      }
                    },
                    {
                      "id": "Acidovorax_avenae_subsp_avenae_strain_INV_CP028293",
                      "parent": "Internal_node16",
                      "name": "Acidovorax_avenae_subsp_avenae_strain_INV_CP028293",
                      "customLabel": "0.004930576",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.004930576')
                      }
                    },
                    {
                      "id": "Acidovorax_avenae_subsp_avenae_strain_KL3_NZ_CP028294",
                      "parent": "Internal_node16",
                      "name": "Acidovorax_avenae_subsp_avenae_strain_KL3_NZ_CP028294",
                      "customLabel": "0.006195703",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.006195703')
                      }
                    },
                    {
                      "id": "Internal_node17",
                      "parent": "Internal_node15",
                      "name": "1",
                      "customLabel": "0.001550295",
                      "level": 3,
                      "link": {
                        "color": getLinkColor('0.001550295')
                      }
                    },
                    {
                      "id": "Acidovorax_avenae_subsp_avenae_strain_NCT3_CP028298",
                      "parent": "Internal_node17",
                      "name": "Acidovorax_avenae_subsp_avenae_strain_NCT3_CP028298",
                      "customLabel": "0.003562439",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.003562439')
                      }
                    },
                    {
                      "id": "Internal_node18",
                      "parent": "Internal_node17",
                      "name": "1",
                      "customLabel": "0.01189883",
                      "level": 4,
                      "link": {
                        "color": getLinkColor('0.01189883')
                      }
                    },
                    {
                      "id": "Acidovorax_avenae_subsp_avenae_strain_MDB1_CP028296",
                      "parent": "Internal_node18",
                      "name": "Acidovorax_avenae_subsp_avenae_strain_MDB1_CP028296",
                      "customLabel": "0.010556794",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.010556794')
                      }
                    },
                    {
                      "id": "Acidovorax_avenae_subsp_avenae_strain_QHB1_CP028300",
                      "parent": "Internal_node18",
                      "name": "Acidovorax_avenae_subsp_avenae_strain_QHB1_CP028300",
                      "customLabel": "0.001828646",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.001828646')
                      }
                    },
                    {
                      "id": "Internal_node19",
                      "parent": "Internal_node0",
                      "name": "1",
                      "customLabel": "0.003508367",
                      "level": 2,
                      "link": {
                        "color": getLinkColor('0.003508367')
                      }
                    },
                    {
                      "id": "Acidovorax_avenae_subsp_avenae_strain_Sa2_CP028301",
                      "parent": "Internal_node19",
                      "name": "Acidovorax_avenae_subsp_avenae_strain_Sa2_CP028301",
                      "customLabel": "0.020273458",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.020273458')
                      }
                    },
                    {
                      "id": "Internal_node20",
                      "parent": "Internal_node19",
                      "name": "1",
                      "customLabel": "0.001677785",
                      "level": 3,
                      "link": {
                        "color": getLinkColor('0.001677785')
                      }
                    },
                    {
                      "id": "Internal_node21",
                      "parent": "Internal_node20",
                      "name": "1",
                      "customLabel": "0.001165597",
                      "level": 4,
                      "link": {
                        "color": getLinkColor('0.001165597')
                      }
                    },
                    {
                      "id": "Internal_node22",
                      "parent": "Internal_node21",
                      "name": "1",
                      "customLabel": "0.00218656",
                      "level": 5,
                      "link": {
                        "color": getLinkColor('0.00218656')
                      }
                    },
                    {
                      "id": "Acidovorax_avenae_subsp_avenae_strain_AA99_2_NZ_CP028289",
                      "parent": "Internal_node22",
                      "name": "Acidovorax_avenae_subsp_avenae_strain_AA99_2_NZ_CP028289",
                      "customLabel": "0.004003962",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.004003962')
                      }
                    },
                    {
                      "id": "Internal_node23",
                      "parent": "Internal_node22",
                      "name": "1",
                      "customLabel": "0.003641117",
                      "level": 6,
                      "link": {
                        "color": getLinkColor('0.003641117')
                      }
                    },
                    {
                      "id": "Acidovorax_avenae_subsp_avenae_NZ_CP028302",
                      "parent": "Internal_node23",
                      "name": "Acidovorax_avenae_subsp_avenae_NZ_CP028302",
                      "customLabel": "0.00052496",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.00052496')
                      }
                    },
                    {
                      "id": "Acidovorax_avenae_subsp_avenae_strain_INDB2_CP028292",
                      "parent": "Internal_node23",
                      "name": "Acidovorax_avenae_subsp_avenae_strain_INDB2_CP028292",
                      "customLabel": "0.003156374",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.003156374')
                      }
                    },
                    {
                      "id": "Internal_node24",
                      "parent": "Internal_node21",
                      "name": "0.975",
                      "customLabel": "0.000803161",
                      "level": 5,
                      "link": {
                        "color": getLinkColor('0.000803161')
                      }
                    },
                    {
                      "id": "Internal_node25",
                      "parent": "Internal_node24",
                      "name": "1",
                      "customLabel": "0.002273576",
                      "level": 6,
                      "link": {
                        "color": getLinkColor('0.002273576')
                      }
                    },
                    {
                      "id": "Acidovorax_avenae_subsp_avenae_strain_SH7_NZ_CP028303",
                      "parent": "Internal_node25",
                      "name": "Acidovorax_avenae_subsp_avenae_strain_SH7_NZ_CP028303",
                      "customLabel": "0.003245276",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.003245276')
                      }
                    },
                    {
                      "id": "Internal_node26",
                      "parent": "Internal_node25",
                      "name": "0.52",
                      "customLabel": "0.000291644",
                      "level": 7,
                      "link": {
                        "color": getLinkColor('0.000291644')
                      }
                    },
                    {
                      "id": "Acidovorax_avenae_subsp_avenae_strain_MD5_NZ_CP028295",
                      "parent": "Internal_node26",
                      "name": "Acidovorax_avenae_subsp_avenae_strain_MD5_NZ_CP028295",
                      "customLabel": "0.000718034",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.000718034')
                      }
                    },
                    {
                      "id": "Internal_node27",
                      "parent": "Internal_node26",
                      "name": "1",
                      "customLabel": "0.002385182",
                      "level": 8,
                      "link": {
                        "color": getLinkColor('0.002385182')
                      }
                    },
                    {
                      "id": "Acidovorax_avenae_subsp_avenae_strain_MOR_CP028297",
                      "parent": "Internal_node27",
                      "name": "Acidovorax_avenae_subsp_avenae_strain_MOR_CP028297",
                      "customLabel": "0.004796793",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.004796793')
                      }
                    },
                    {
                      "id": "Acidovorax_avenae_subsp_avenae_strain_QH1_CP028299",
                      "parent": "Internal_node27",
                      "name": "Acidovorax_avenae_subsp_avenae_strain_QH1_CP028299",
                      "customLabel": "0.004578707",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.004578707')
                      }
                    },
                    {
                      "id": "Acidovorax_avenae_subsp_avenae_strain_COLB1_CP028291",
                      "parent": "Internal_node24",
                      "name": "Acidovorax_avenae_subsp_avenae_strain_COLB1_CP028291",
                      "customLabel": "0.006939673",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.006939673')
                      }
                    },
                    {
                      "id": "Internal_node28",
                      "parent": "Internal_node20",
                      "name": "0.674",
                      "customLabel": "0.001037087",
                      "level": 4,
                      "link": {
                        "color": getLinkColor('0.001037087')
                      }
                    },
                    {
                      "id": "Internal_node29",
                      "parent": "Internal_node28",
                      "name": "1",
                      "customLabel": "0.001009289",
                      "level": 5,
                      "link": {
                        "color": getLinkColor('0.001009289')
                      }
                    },
                    {
                      "id": "Acidovorax_avenae_subsp_avenae_ATCC_19860_NC_015138",
                      "parent": "Internal_node29",
                      "name": "Acidovorax_avenae_subsp_avenae_ATCC_19860_NC_015138",
                      "customLabel": "0.001693658",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.001693658')
                      }
                    },
                    {
                      "id": "Acidovorax_avenae_subsp_avenae_strain_AA81_1_NZ_CP028288",
                      "parent": "Internal_node29",
                      "name": "Acidovorax_avenae_subsp_avenae_strain_AA81_1_NZ_CP028288",
                      "customLabel": "0.005690278",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.005690278')
                      }
                    },
                    {
                      "id": "Acidovorax_avenae_subsp_avenae_strain_AA78_5_NZ_CP028287",
                      "parent": "Internal_node28",
                      "name": "Acidovorax_avenae_subsp_avenae_strain_AA78_5_NZ_CP028287",
                      "customLabel": "0.016701406",
                      "level": 11,
                      "link": {
                        "color": getLinkColor('0.016701406')
                      }
                    }
                  
                  
            ],
            marker: {
                symbol: 'circle',
                radius: 6,
                fillColor: '#ffffff',
                lineWidth: 3
            },
            dataLabels: {
                align: 'left',
                linkFormat: '<span style="color: green; font-size: 5px;">{point.customLabel}</span>',
                pointFormat: '{point.name}',
                pointerEvents: 'none',
                style: {
                    color: '#000000',
                    textOutline: '3px #ffffff',
                    whiteSpace: 'nowrap'
                },
                x:15,
                crop: false,
                overflow: 'none'
            },
            levels: [
                { level: 2, colorByPoint: false },
                // { level: 3, colorByPoint: true },
                // // { level: 4, colorByPoint: true },
                // // { level: 5, colorByPoint: true },
                // // { level: 6, colorByPoint: true }
            ],
            point: {
                events: {
                    click: function () {
                        if (!this.children || this.children.length === 0) {
                            if (!this.id.startsWith('Internal') && this.id !== 'root') {
                                const newLabel = prompt('Edit node label:', this.name);
                                if (newLabel !== null) {
                                    this.update({ name: newLabel });
                                }
                            }
                        }
                    }
                }
            }
        }
    ]
});
