function getLinkColor(value) {
    // Example logic: color links based on distance values
    const num = parseFloat(value);
    if (num < 0.001) return '#2ECC71';     // green
    if (num < 0.01) return '#F1C40F';       // yellow
    if (num < 0.1) return '#E67E22';        // orange
    return '#E74C3C';                       // red
}


Highcharts.chart('container', {
    chart: {
        spacingBottom: 30,
        marginRight: 500,
        type: 'treegraph',
        height: 1200,
        zoomType: 'xy',
        panning: true,
        panKey: 'shift'
    },
    title: {
        text: 'Phylogenetic Tree Visualization'
    },
    series: [{
        dataLabels: {
            enabled: true,
            linkFormat: '<span style="color: green; font-size: 8px;">{point.customLabel}</span>', // Style only customLabel
            align: 'left',
            style: {
                fontSize: '9px',
                fontWeight: 'normal',
                color: 'black',
                width: '150px',
                overflow: 'none',
                whiteSpace: 'nowrap',
                wordWrap: 'break-word',
                x:20,
                y:0,
            },
        },
        data: [
            
            
                { id: 'root', name: 'Root', level: 0 },
                { id: 'Internal_node0', parent: 'root', name: '1', customLabel: '0', level: 1, link: { color: getLinkColor('0') } },
                { id: 'ALL_Thiomonas_intermedia_K12_NC_014153', parent: 'Internal_node0', name: 'ALL_Thiomonas_intermedia_K12_NC_014153', customLabel: '0.01096', level: 7, link: { color: getLinkColor('0.01096') } },
                { id: 'Internal_node1', parent: 'Internal_node0', name: '1', customLabel: '0.00185', level: 2, link: { color: getLinkColor('0.00185') } },
                { id: 'Internal_node2', parent: 'Internal_node1', name: '1', customLabel: '0.04606', level: 3, link: { color: getLinkColor('0.04606') } },
                { id: 'ALL_Thiomonas_intermedia_strain_ATCC_15466_NZ_CP020046', parent: 'Internal_node2', name: 'ALL_Thiomonas_intermedia_strain_ATCC_15466_NZ_CP020046', customLabel: '0.0671', level: 7, link: { color: getLinkColor('0.0671') } },
                { id: 'ALL_Thiomonas_sp_X19_chromosome_THIX_NZ_LT605203', parent: 'Internal_node2', name: 'ALL_Thiomonas_sp_X19_chromosome_THIX_NZ_LT605203', customLabel: '0.31477', level: 7, link: { color: getLinkColor('0.31477') } },
                { id: 'Internal_node3', parent: 'Internal_node1', name: '1', customLabel: '0.0116', level: 3, link: { color: getLinkColor('0.0116') } },
                { id: 'ALL_Thiomonas_sp_Bio17B3_chromosome_BIO17B3_NZ_LR131947', parent: 'Internal_node3', name: 'ALL_Thiomonas_sp_Bio17B3_chromosome_BIO17B3_NZ_LR131947', customLabel: '-0.00001', level: 7, link: { color: getLinkColor('-0.00001') } },
                { id: 'Internal_node4', parent: 'Internal_node3', name: '1', customLabel: '0.00001', level: 4, link: { color: getLinkColor('0.00001') } },
                { id: 'Internal_node5', parent: 'Internal_node4', name: '1', customLabel: '0.00001', level: 5, link: { color: getLinkColor('0.00001') } },
                { id: 'ALL_Thiomonas_sp_CB2_chromosome_CB2_NZ_LR131956', parent: 'Internal_node5', name: 'ALL_Thiomonas_sp_CB2_chromosome_CB2_NZ_LR131956', customLabel: '-0.00001', level: 7, link: { color: getLinkColor('-0.00001') } },
                { id: 'ALL_Thiomonas_sp_OC7_chromosome_OC7_NZ_LR131953', parent: 'Internal_node5', name: 'ALL_Thiomonas_sp_OC7_chromosome_OC7_NZ_LR131953', customLabel: '0.00001', level: 7, link: { color: getLinkColor('0.00001') } },
                { id: 'ALL_Thiomonas_sp_Sup16B3_chromosome_SUP16B3_NZ_LR131950', parent: 'Internal_node4', name: 'ALL_Thiomonas_sp_Sup16B3_chromosome_SUP16B3_NZ_LR131950', customLabel: '0', level: 7, link: { color: getLinkColor('0') } },
                { id: 'ALL_Thiomonas_arsenitoxydans_strain_3As_NC_014145', parent: 'Internal_node0', name: 'ALL_Thiomonas_arsenitoxydans_strain_3As_NC_014145', customLabel: '0.0107', level: 7, link: { color: getLinkColor('0.0107') } }
              
              
        ],
        marker: {
            symbol: 'circle',
            radius: 7,
            fillcolor: '#ffffff',
            linewidth: 3
        },
        levels:[
            {
                level:2,
                colorByPoint:true,
            },
            {
                level:3,
                colorByPoint:true,

            },
            {
                level:4,
                colorByPoint:true,
            },
            {
                level:5,
                colorByPoint:true,
            },
            {
                level:6,
                colorByPoint:true,
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

