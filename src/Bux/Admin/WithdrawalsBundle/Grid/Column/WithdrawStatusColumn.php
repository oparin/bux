<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/8/15
 * Time: 12:53 PM
 */

namespace Bux\Admin\WithdrawalsBundle\Grid\Column;

use APY\DataGridBundle\Grid\Column\Column;

/**
 * Class WithdrawStatusColumn
 *
 * @package Bux\Admin\WithdrawalsBundle\Grid\Column
 */
class WithdrawStatusColumn extends Column
{
    /**
     * @param array $params
     */
    public function __initialize(array $params)
    {
        parent::__initialize($params);

        // Disable the filter of the column
//        $this->setFilterable(false);
//        $this->setOrder(false);
    }

    /**
     * @return string
     */
    public function getType()
    {
        return 'withdraw_status';
    }
}