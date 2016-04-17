<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/16/15
 * Time: 1:09 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Grid\Column;

use APY\DataGridBundle\Grid\Column\Column;

/**
 * Class AdStatusColumn
 *
 * @package Bux\Admin\AdvertisementsBundle\Grid\Column
 */
class AdStatusColumn extends Column
{

    /**
     * @param array $params
     */
    public function __initialize(array $params)
    {
        parent::__initialize($params);

        // Disable the filter of the column
//        $this->setFilterable(false);
        $this->setOrder(true);
    }

    /**
     * @return string
     */
    public function getType()
    {
        return 'ad_status';
    }
}