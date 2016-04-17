<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/9/15
 * Time: 12:26 PM
 */

namespace Bux\Admin\SupportBundle\Grid\Column;

use APY\DataGridBundle\Grid\Column\Column;

/**
 * Class TicketStatusColumn
 *
 * @package Bux\Admin\SupportBundle\Grid\Column
 */
class TicketStatusColumn extends Column
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
        return 'support_ticket_status';
    }
}